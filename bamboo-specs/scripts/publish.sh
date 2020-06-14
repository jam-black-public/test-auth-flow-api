#!/bin/sh

MYDIR="$(dirname $0)"

if test -f ${MYDIR}/lib.sh.in; then
    . ${MYDIR}/lib.sh.in
else
    echo "bamboo-specs are corrupted. Failing build"
    exit 1
fi

cat ~/.docker/artifactory_user | ${DOCKER_BIN} login -u ${DOCKER_USER} --password-stdin ${DOCKER_REGISTRY}
${DOCKER_BIN} push ${DOCKER_TAG}
${DOCKER_BIN} logout ${DOCKER_REGISTRY}
