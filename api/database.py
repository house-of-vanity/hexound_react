#
# Copyright (c) 2020, UltraDesu <ultradesu@hexor.ru>
# All rights reserved.
# 
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are met:
#     * Redistributions of source code must retain the above copyright
#     notice, this list of conditions and the following disclaimer.
#     * Redistributions in binary form must reproduce the above copyright
#     notice, this list of conditions and the following disclaimer in the
#     documentation and/or other materials provided with the distribution.
#     * Neither the name of the <organization> nor the
#     names of its contributors may be used to endorse or promote products
#     derived from this software without specific prior written permission.
# 
# THIS SOFTWARE IS PROVIDED BY UltraDesu <ultradesu@hexor.ru> ''AS IS'' AND ANY
# EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
# WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
# DISCLAIMED. IN NO EVENT SHALL UltraDesu <ultradesu@hexor.ru> BE LIABLE FOR ANY
# DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
# (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
# LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
# ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
# (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
# SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
#
"""
.. module:: models
   :synopsis: Contains database action primitives.
.. moduleauthor:: AB <github.com/house-of-vanity>
"""

import sqlite3
import logging
from tools.passwd import hash_password, verify_password, rand_hash

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
log = logging.getLogger(__name__)


# class DataBase create or use existent SQLite database file. It provides 
# high-level methods for database.
class DataBase:
    """This class create or use existent SQLite database file. It provides 
    high-level methods for database."""
    def __init__(self, scheme, basefile='data.sqlite'):
        """
          Constructor creates new SQLite database if 
          it doesn't exist. Uses SQL code from file for DB init.
          :param scheme: sql filename
          :type scheme: string
          :return: None
        """
        self.scheme = ''
        self.basefile = basefile
        try:
            conn = self.connect(basefile=basefile)
        except:
            log.debug('Could not connect to DataBase.')
            return None
        with open(scheme, 'r') as scheme_sql:
            sql = scheme_sql.read()
            self.scheme = sql
            if conn is not None:
                try:
                    cursor = conn.cursor()
                    cursor.executescript(sql)
                except Exception as e:
                    log.debug('Could not create scheme - %s', e)
            else:
                log.debug("Error! cannot create the database connection.")
        log.info('DB created.')
        self.close(conn)

    def connect(self, basefile):
        """
          Create connect object for basefile
          :param basefile: SQLite database filename
          :type basefile: string
          :return: sqlite3 connect object
        """
        #log.debug("Open connection to %s", basefile)
        return sqlite3.connect(basefile, check_same_thread=False)

    def execute(self, sql, params):
        """
          Execute SQL code. First of all connect to self.basefile. Close 
          connection after execution.
          :param sql: SQL code
          :type sql: string
          :return: list of response. Empty list when no rows are available.
        """
        conn = self.connect(basefile=self.basefile)
        log.debug("Executing: %s %s", sql, params)
        cursor = conn.cursor()
        cursor.execute(sql, params)
        conn.commit()
        result = cursor.fetchall()
        self.close(conn)
        return result

    def close(self, conn):
        """
          Close connection object instance.
          :param conn: sqlite3 connection object
          :type conn: object
          :return: None
        """
        #log.debug("Close connection to %s", self.basefile)
        conn.close()

    def add_mod(self, file_meta, author='Anonymous'):
        secure_name =  file_meta['secure_name']
        real_name = file_meta['real_name']
        mime = file_meta['mime']
        file_hash = file_meta['hash']
        title = file_meta['title']
        sample = file_meta['sample']
        message = file_meta['message']
        metaphone = file_meta['metaphone']
        sql = """INSERT OR IGNORE INTO 
              mods('secure_name', 'real_name', 'mime', 'hash', 
                  'author', 'title', 'sample', 'message', 'metaphone')
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"""
        self.execute(sql, (
              secure_name,
              real_name,
              mime,
              file_hash,
              author,
              title,
              sample,
              message,
              metaphone,
              ))
        return True

    def get_mods(self, limit, offset):
        sql = """SELECT 
              rowid, real_name, title, mime, 
              strftime('%s', date) as str_time, author, date, hash, secure_name 
              FROM mods LIMIT ?,?"""
        mods = list()
        result = self.execute(sql, (offset, limit))
        for mod in result:
            mods.append(
                {
                    'id': mod[0],
                    'real_name': mod[1],
                    'title': mod[2],
                    'mimetype': mod[3],
                    'str_time': mod[4],
                    'author': mod[5],
                    'time': mod[6],
                    'hash': mod[7],
                    'secure_name': mod[8],
                }
            )
        return mods

    def get_mod(self, mod_id):
        sql = """SELECT 
              rowid, real_name, secure_name, mime,
              strftime('%s', date) as str_time, author, date, 
              hash, title, sample, message 
              FROM mods WHERE rowid = ?"""
        result = self.execute(sql, (mod_id,))
        if result:
            meta = result[0]
            mod = {
                'id': meta[0],
                'real_name': meta[1],
                'secure_name': meta[2],
                'mimetype': meta[3],
                'time': meta[4],
                'author': meta[5],
                'str_time': meta[6],
                'hash': meta[7],
                'title': meta[8],
                'sample': meta[9],
                'message': meta[10],
            }
        else:
            mod = list()
        return mod

    def find_mod(self, param=None):
        """
          Looking for mod dublicates.
          :param param: name or hash of module to search.
          :type param: string
          :return: list
        """
        sql = """SELECT rowid FROM mods WHERE real_name == ? OR
              hash == ? ORDER BY rowid DESC LIMIT 1"""
        result = self.execute(sql, (param, param))
        return result

    def search(self, query):
        """
          Perform module search through the base.
        """
        sql = """SELECT rowid, secure_name, title, mime, date, 
              strftime('%s', date) as str_time FROM mods 
              WHERE 
              secure_name LIKE ? OR 
              title LIKE ? OR
              message LIKE ? OR
              sample LIKE ?"""
        query_mask = f"%{query}%"
        result = self.execute(sql, tuple(query_mask for i in range(0, 4)))
        log.debug(result)
        return result

    def signin(self, name, password):
        """
          auth client
        """
        result = {"status": False, 'message': 'User is invalid.'}
        sql = "SELECT name, password FROM users WHERE name = ?"
        ret = self.execute(sql, (name,))
        if len(ret) == 0:
            result = {'status': False, 'message': 'User doesn\'t exist'}
        elif len(ret) == 1:
            stored_hash = ret[0][1]
            print(stored_hash, password)
            print(verify_password(stored_hash, password))
            if verify_password(stored_hash, password):
                result = {"status": True, 'message': 'User is valid.'}
        return result

    def signup(self, name, password):
        """
          add client
        """
        sql = "SELECT name FROM users WHERE name = ?"
        ret = self.execute(sql, (name,))
        if len(ret) != 0:
            return {'status': False, 'message': 'User exist'}
        else:
            sql = "INSERT INTO users (name, password) VALUES (?, ?)"
            ret = self.execute(sql, (name, password))
        return ret

    def login(self, name):
        """
          **Perform action with users table**
          :param action: Requested action
          :type action: string
          :returns: None ?
        """
        sql = "SELECT pass, rowid FROM users WHERE name = '%s'" % name
        ret = self.execute(sql)
        if len(ret) == 0:
            ret = False
        else:
            ret = ret[0]
        return ret
