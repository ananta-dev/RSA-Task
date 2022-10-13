import 'bootstrap/dist/css/bootstrap.min.css'
import { SWRConfig } from 'swr'
import axios from 'axios'
import NewQuotePage from './components/QuotePage'
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
        </SWRConfig>
    )
}

export default App
