export default function scale(height:number){
    if (height >= 1000) {
        return 2.0
    } else if (window.innerHeight >= 700) {
        return 1.5
    } else {
        return 1.0
    }
}
