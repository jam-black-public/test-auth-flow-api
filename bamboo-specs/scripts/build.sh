#!/bin/sh

set -x
set -e

MYDIR="$(dirname $0)"

if test -f ${MYDIR}/lib.sh.in; then
    . ${MYDIR}/lib.sh.in
else
    echo "bamboo-specs are corrupted. Failing build"
    exit 1
fi

${DOCKER_BIN} build -t ${DOCKER_TAG} -f ${DOCKER_FILE} .