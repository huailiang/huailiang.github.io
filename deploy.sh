# ================================================================================
# This tool is for fast deploy 
# --------------------------------------------------------------------------------
# Author: Huailiang.Peng
# Data:   2019.05.03
# Usage:
#	sh deploy.sh arg1  
#		如果arg1是1 会重新生成_site, 不带arg1或者arg1是其他值的时候回工作目录的cached _site
# =================================================================================
#!/bin/sh


path=$(cd `dirname $0`; pwd)
name="${path##*/}"
gitee=~/Documents/projects/penghuailiang
echo $path
echo $name

cd $path

if [[ ${1} == 1 ]]; then

echo "重新生成_site"

bundle exec jekyll b

if [ $? -ne 0 ]; then
	echo "sorry, build _site failure, job terminal!"
    exit 1
fi
fi

function exec_git_pull(){
	git clean -df
	git checkout .
	git checkout master
	git pull -q
	git status -s
}

function exec_git_push(){
	git branch
	git add .
	git commit -m "deploy "`date +"%Y-%m-%d"`
	git push
}


cd /tmp/

# 清理之前残留的目录
rm -rf temp.*

tempdir=`mktemp -d temp.XXXXXX`

cp -R ${path} ${tempdir}

cd  ${tempdir}/${name}

mv _site ../

mv README.md ../

mv LICENSE ../

echo "开始切换分支到master"

pwd

exec_git_pull
 
for file in $(ls .)
do
    rm -rf $file
done


cd ../_site/

for file in $(ls .)
do
	mv  $file ../${name}/
done

cd ../

mv LICENSE ${name}

mv README.md ${name}

cd $name

echo "开始上传到github"

exec_git_push

echo "job done, bye"

rm -rf /tmp/temp*

# echo "start sync Gitee"

# workdir=`pwd`

# function sync_tree_dir(){
# 	rm -rf ${gitee}/${1}
# 	cp -rf ${workdir}/${1} ${gitee}/${1}
# }

# cd ${gitee}

# exec_git_pull

# # apply modify
# sync_tree_dir blog/
# sync_tree_dir img/
# sync_tree_dir js/
# sync_tree_dir category/

# exec_git_push




