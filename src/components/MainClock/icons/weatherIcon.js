import d1 from './01d.png';
import n1 from './01n.png';
import d2 from './02d.png';
import n2 from './02n.png';
import d3 from './03d.png';
import n3 from './03n.png';
import d4 from './04d.png';
import n4 from './04n.png';
import d9 from './09d.png';
import n9 from './09n.png';
import d10 from './10d.png';
import n10 from './10n.png';
import d11 from './11d.png';
import n11 from './11n.png';
import d13 from './13d.png';
import n13 from './13n.png';
import d50 from './50d.png';
import n50 from './50n.png';

export const GetWeatherIco = (ico) => {    
    const icoArray = {
        "01d": d1,
        "01n": n1,
        "02d": d2,
        "02n": n2,
        "03d": d3,
        "03n": n3,
        "04d": d4,
        "04n": n4,
        "09d": d9,
        "09n": n9,
        "10d": d10,
        "10n": n10,
        "11d": d11,
        "11n": n11,
        "13d": d13,
        "13n": n13,
        "50d": d50,
        "50n": n50
    }    
    return icoArray[ico];
}
