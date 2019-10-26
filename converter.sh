!#/bin/bash
# it requires ffmpeg and xmp player
mod_file=$1
mp3_dir=mp3s

mp3_file=$(basename ${1/\.*/}.mp3)
wav_file=$(basename ${1/\.*/}.wav)
tmp_dir=$(mktemp -d)

mkdir -p ${mp3_dir}
xmp ${mod_file} -o ${tmp_dir}/${wav_file} && \
ffmpeg -i ${tmp_dir}/${wav_file} -codec:a libmp3lame -qscale:a 2 ${mp3_dir}/${mp3_file}
