interface Config {
    url:string
}

// 이런식으로 TS에서 JS파일을 불러올 수 있음
declare module "myPackage" {
    function init(config:Config): boolean;
    function exit(code: number):number;
}