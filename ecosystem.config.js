module.exports = {
    apps: [
        {
            name: 'shareitywebappnuxtjs',
            cwd: "/home/ubuntu/shareitywebappssr/",
            script: 'npm',
            args: 'start',
            ignore_watch : ["node_modules", "package-lock.json",".git"],
            watch: true
        }
    ],
}