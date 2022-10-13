import 'bootstrap/dist/css/bootstrap.min.css'
import { SWRConfig } from 'swr'
import axios from 'axios'
// import QuotePage from './components/QuotePage'
import NewQuotePage from './components/NewQuotePage'
import GlobalStyles from './global-styles'

// axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.baseURL = 'https://weary-pink-coypu.cyclic.app'

function App() {
    return (
        <SWRConfig
            value={{
                fetcher: url => axios(url).then(res => res.data),
            }}
        >
            <GlobalStyles />
            <NewQuotePage />
            {/* <QuotePage /> */}
        </SWRConfig>
    )
}

export default App
