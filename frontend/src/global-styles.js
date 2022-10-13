import { createGlobalStyle } from 'styled-components'
import FuturaRener from './assets/fonts/Futura_regular.otf'
import MoreThanLight from './assets/fonts/MoreThan-light.woff'
import MoreThanRegular from './assets/fonts/MoreThan-regular.woff'
import MoreThanBold from './assets/fonts/MoreThan-bold.woff'

const GlobalStyles = createGlobalStyle`
    * { 
        /* margin: 0; 
        padding: 0;  */
        /* font-size: 62.5%; */
    }

    /* :root {
        box-sizing: border-box;
        --primary: #645cff;
        --mainBorder: 1px solid red;
        --white: #fff;
    } */
    
    /* *:not(img):not(video):not(svg), *:after, *:before {
        box-sizing: inherit; 
    } */

    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
            'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
            'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
            monospace;
    }

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
