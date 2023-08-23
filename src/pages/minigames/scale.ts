export default function scale():number {
    if (window.innerHeight >= 1000 && window.innerWidth >= 700) {
        return 2.0
    } else if (window.innerHeight >= 700 && window.innerWidth >= 550) {
        return 1.5
    } else {
        return 1.0
    }
}
