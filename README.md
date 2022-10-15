# RSA React Task

Author: **Juan Guirao**
Date: **14 October 2022**

## Live App and Deployment Notes

Want to jump right in? See the app in action [here](https://rsa.freenrg.dev/).

The JSON-Server fake backend API provided has been converted to a tiny server and deployed to cyclic.sh. Please note I have added a unique id property to each addon in the db.json file.

You may access the backend API here: [https://weary-pink-coypu.cyclic.app/](https://weary-pink-coypu.cyclic.app/)
Quote endpoint: [https://weary-pink-coypu.cyclic.app/quote](https://weary-pink-coypu.cyclic.app/quote)
Addons endpoint: [https://weary-pink-coypu.cyclic.app/addons](https://weary-pink-coypu.cyclic.app/addons)

The frontend has been deployed to Netlify, and this is the URL: [https://rsa.freenrg.dev/](https://rsa.freenrg.dev/)

If you wish to see the code for the backend server as deployed to cyclic.sh, you may access it here:
https://github.com/ananta-dev/RSA-Backend-Only

If you wish to run the JSON Server localy on your computer, you will need change the API URL in App.js. To do so, uncomment this line of text:

`// axios.defaults.baseURL = 'http://localhost:4000'`

And comment out the following line:

`axios.defaults.baseURL = 'https://weary-pink-coypu.cyclic.app'`

## Technologies Used

-   **Styled Components**: https://styled-components.com/
-   **Bootstrap**: https://getbootstrap.com/
-   **SWR**: https://swr.vercel.app/
-   **Axios**: https://axios-http.com/
-   **React-hide-on-scroll**: https://www.npmjs.com/package/react-hide-on-scroll

I had previous experience with **Bootstrap** and **Axios**.
I had never used **Styled Components**, **SWR** or **React-hide-on-Scroll**.

## CSS

Since I know RSA uses **Styled Components**, I decided to use them as well, even though I had never used them.

I initially planned to do everything with styled components only. However, as I worked on the responsiveness of the webpage I felt I was reinventing the wheel. I knew **Bootstrap** provides layouts that are responsive out of the box and finally decided to combine **Bootstrap** and **Styled Components**.

I have used Bootstrap for the general layout and responsiveness of the webpage, and **Styled Components** to apply styling beyond the standard capabilities of **Bootstrap**, as well as to fine tune the responsiveness whenever Bootstrap fell short. This separation of concerns is probably not always respected.

I do feel I need much more practice with **Styled Components** to make full use of its features. I also know the hardcoded colours and other parts of the CSS used could be improved with the use of a design system and the corresponding variables.

## Responsiveness

I have worked to make the webpage responsive with resolutions down to **320px**. Beyond that point, some elements start to behave in undesirable ways, such as overflowing from their containers. I believe **320px** is small enough to cover most mobile phones in the UK market. However, if responsiveness at lower resolutions is required, I am happy to continue refining the webpage's responsiveness.

## Data Fetching with SWR

In general, I prefer not to use simple **fetch** and **useEffect** to retrieve data from the API. Even though **fetch + useEffect** should have worked fine, I prefer solutions, like **React-Query** or **SWR** that overcome some of the issues with the **fetch + useEffect** solution.

Here are some references:

-   https://www.developerway.com/posts/how-to-fetch-data-in-react
-   https://javascript.plainenglish.io/why-you-should-use-useswr-instead-of-usestate-when-calling-apis-8b6de5dc18fc
-   https://www.thisdot.co/blog/why-you-should-use-react-query-or-swr
-   https://dev.to/ishanme/swr-supercool-react-hooks-for-data-fetching-4l4b

I was considering **React-Query**, which I had used before, and **SWR**, which I had never used.

After reading the following article I decided to use **SWR** for this particular task: https://blog.logrocket.com/swr-vs-tanstack-query-react/.

## Sticky Footer with React-hide-on-scroll

As the user scrolls down, the total price at the top of the page disappears from the viewport. As he or she changes the selection of addons, he/she cannot see the updated price. The solution, inspired by the MORE THAN website, as it is also the case with colors and fonts, is to create a narrow sticky footer that is displayed as soon as the price at the top is no longer visible and which shows the total price.

The sticky footer has been implemented with the help of a lesser known library: **React-hide-on-scroll**. It is probably a risky decision to include this unknown library. A safer and more robust solution would be to implement the sticky footer from scratch, but I decided to go with a library to save some time.

## A Word About the Design of the Components Used

I started building the webpage with a design of many small React components but finally decided to use only two main components (**QuotePage** and **AddonCard**), which a couple of small auxiliay ones.

### Initial Design (DISCARDED)

My initial plan was to break the webpage into a relatively large number of components with small amount of code each. To avoid drilling down props I would use the Context API with the useContext hook.

![Initial design (Discarded)](https://github.com/ananta-dev/RSA-Task/blob/main/readme-images/OriginalDesign.PNG?raw=true)

This was working out well, but I felt having so many components for a relatively simple webpage was adding unnecessary complexity and taking too long.

### Final Design (USED)

I decided to base the decision to create separate components on whether these was going to be reused several times (such as the **AddonCard**), or its function was separate enough from the main component and did not tightly coupled with the **QuotePage** component by shared data (the case with **StickyFooter** or **TopBar**).

This is what the final design looks like (aside from **StickyFooter** and **TopBar**):

![Initial design (Discarded)](https://github.com/ananta-dev/RSA-Task/blob/main/readme-images/FinalDesign.PNG?raw=true)

## Further Work

There are several improvements to the webpage I have been thinking of making:

-   Add React tests
-   Convert the webpage to a Gatsby app
-   Protect the API with authentication token (JWT)
-   Use variables for design/theme-related values in CSS
-   Add more error handling around the fetching of data from the API.

If you would like me to implement any of these, I would be happy to do so. I just would need some guidance on which improvements are considered more important and relevant to the role at hand.

## Update #1 (15 October 2022)

After reviewing the code in QuotePage.js I realised there was one useEffect that was unnecessary.

The following code:

```
    const [totalPrice, setTotalPrice] = useState({
        monthly: 0,
        annual: 0,
    })
```

```
    useEffect(() => {
        if (quote && addons && addonSelection) {
            const [addonsMonthlyTotal, addonsAnnualTotal] = addons.reduce(
                (prev, addon) =>
                    addonSelection.get(addon.id)
                        ? [
                              prev[0] + addon.monthlyPrice,
                              prev[1] + addon.annualPrice,
                          ]
                        : prev,
                [0, 0]
            )
            setTotalPrice({
                monthly: quote.monthlyPrice + addonsMonthlyTotal,
                annual: quote.annualPrice + addonsAnnualTotal,
            })
        }
    }, [quote, addons, addonSelection])
```

has been replaced by this:

```
    let totalPrice
    if (quote && addons && addonSelection) {
        const [addonsMonthlyTotal, addonsAnnualTotal] = addons.reduce(
            (prev, addon) =>
                addonSelection.get(addon.id)
                    ? [
                          prev[0] + addon.monthlyPrice,
                          prev[1] + addon.annualPrice,
                      ]
                    : prev,
            [0, 0]
        )
        totalPrice = {
            monthly: quote.monthlyPrice + addonsMonthlyTotal,
            annual: quote.annualPrice + addonsAnnualTotal,
        }
    }
```

Note I am no longer initialising totalPrice to:

```
    {
        monthly: 0,
        annual: 0,
    }
```

The reason is I did not like the webpage to show £0.00 for a fraction of a second. Therefore I decided to leave totalPrice undefined until properly set, and display totalPrice conditionally, only after it has been set:

```
    {totalPrice && (
        <>
            {/* prettier-ignore */}
            <p className='total-price'>
                £
                {monthlyBilling
                    ? totalPrice.monthly.toFixed(2)
                    : totalPrice.annual.toFixed(2)}
            </p>
            <p className='fs-3 lh-1 pb-1'>
                {monthlyBilling
                    ? 'per month'
                    : 'per year'}
            </p>
            <p className='fs-6 lh-1 mb-4 tax-text'>
                This price includes Insurance
                Premium Tax at the current rate.{' '}
                {monthlyBilling
                    ? 'No charge for paying monthly.'
                    : ''}
            </p>
        </>
    )}
```

and

```g
    {totalPrice && (
        <StickyFooter
            dataFetched={quote && addons}
            monthlyBilling={monthlyBilling}
            totalPrice={totalPrice}
        />
    )}
```
