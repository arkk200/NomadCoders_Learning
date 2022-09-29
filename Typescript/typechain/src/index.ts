import { init, exit } from 'myPackage';

init({
    url:"true"
})

exit(1)

// lib에 DOM이 있어야 쓸 수 있음
localStorage.clear()