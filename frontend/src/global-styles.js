import { createGlobalStyle } from 'styled-components'
import FuturaRener from './assets/fonts/Futura_regular.otf'
import MoreThanLight from './assets/fonts/MoreThan-light.woff'
import MoreThanRegular from './assets/fonts/MoreThan-regular.woff'
import MoreThanBold from './assets/fonts/MoreThan-bold.woff'

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'FuturaRener';
        src: url(${FuturaRener});
    }

    @font-face {
        font-family: 'MoreThan-Light';
        src: url(${MoreThanLight}) format('woff');
    }

    @font-face {
        font-family: 'MoreThan-Regular';
        src: url(${MoreThanRegular}) format('woff');
    }

    @font-face {
        font-family: 'MoreThan-Bold';
        src: url(${MoreThanBold}) format('woff');
    }
`

export default GlobalStyles
