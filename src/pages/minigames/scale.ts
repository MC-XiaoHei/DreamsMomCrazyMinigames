export default function scale():number {
    if (window.innerHeight >= 1200 && window.innerWidth >= 630) {
        return 1.8
    } else if (window.innerHeight >= 700 && window.innerWidth >= 550) {
        return 1.5
    } else {
        return 1.0
    }
}
