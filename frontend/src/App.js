import { SWRConfig } from 'swr'
import axios from 'axios'
import QuotePage from './components/QuotePage'
import GlobalStyles from './global-styles'

axios.defaults.baseURL = 'http://localhost:4000'

function App() {
    return (
        <SWRConfig
            value={{
                fetcher: url => axios(url).then(res => res.data),
            }}
        >
            <GlobalStyles />
            <QuotePage />
        </SWRConfig>
    )
}

export default App
