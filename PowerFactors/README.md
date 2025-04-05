## This repository has been created for the technical assignment of Power Factors.

The task involves building a frontend application that fetches data from a public cryptocurrency API and displays it in a paginated table and chart format. The application is built using Angular and demonstrates the use of NgRx for state management.

## Installation & Setup
1.	Clone the repository
2.	git clone https://github.com/VagDimitrop/PowerFactors.git
3. Install dependencies
4. cd PowerFactors
5. npm install
6. Run the development server
7. ng serve


## Features
This repo consists of two branches. Implementation has started on master branch and was forked in order to add NgRx state management.
Both branches use the same components, page components and services. 

There are three pages accessible to the user and an extra page that the user is redirected to in case an error occurs while an API call is in progress.

Home Page: The user is presented with two option items that redirect him respectively.

Table Page: The user can see a table of 20 cryptocurrencies. At the bottom of the table, there is a paginator, which can be used to navigate to the next/previous 20 cryptocurrencies. The currencies are sorted by market cap. The user can sort the rendered currencies by clicking on the desired column to sort by,  filter the rendered currencies by typing on the respective field, or search inside the entire data set. Filtering is performed on keyUp action while searching onBlur. In case that the table cannot fit entirely in the page, a horizontal scrollbar is rendered.

ChartPage: For this page, we have used the Highcarts library to create a pie chart, showcasing 10 cryptocurrencies with the largest market cap. While hovering over a piece of the pie chart, a tooltip appears, where extra information is shown (Price, 24h Volume & 24h Percentage Change)

Error Page: This page is accessible only if an error is returned from the server. To navigate to this page, please add a random character to the apiUrl variable found in the coinGeckoService, refresh the page hosting the app and navigate to either Table page or Chart page.

Sidebar Component: This component serves as the menu of the app. It can be found inside the app.component.html allowing it to be rendered across the app without each page having to include it in its template. 

Modal Dialog Component: Serves as the dialog of the application, which is triggered to be visible only when a request is in progress. When the request that has triggered the dialog to open is completed, then the dialog is closed. 

## Responsiveness
The window-size.service is responsible for letting the application know the breakpoint of the screen. Inside this service file, a function is implemented to observe changes in the viewport (case where the user resizes the browser window manually).
The sidebar has two different UIs. When the viewport is larger than 768 pixels, the sidebar is rendered on the left-hand side. On the other hand, if the viewport is smaller than 768 pixels, the sidebar is rendered as a menubar on the top of the app. 
For large breakpoints, the content of the app is pushed 250 pixels to the right, which is equal to the width of the sidebar while for small breakpoints, the content is pushed 80 pixels to the bottom, equal to the menubar’s height.  

Both the table and the chart have been implemented to have as width a percentage of the viewport to shrink/grow accordingly. 

The table’s columns are dynamically assigned. 
For screens larger than 768 pixels, the following columns are displayed: ID,  Name, Symbol', Current Price, Market Cap, Total Volume, High 24H, Low 24h, Price Change Percentage 24H, Circulating Supply.
For screens smaller, fewer columns are displayed: Name, Symbol, Current Price, Price Change Percentage 24H

## Data Fetching 
The method used to fetch the data for the application is what differentiates the two branches in the repository. 

Master branch: In this branch, we have implemented simple data fetching, where the page that needs data to be fetched, invokes the fetchCryptoData function of the coinGecko.service.ts file. Then each page manipulates the data accordingly  in order to be rendered. 

NgRx branch: For the NgRx State Management to work, we have implemented the required actions, effects, reducers and selectors. 
With this implementation, the page components on the initialization stage, dispatch an action that corresponds to asking for the initial data. This action is handled by fetching the data. During this process, the app state changes multiple times.
From having no data and loading equal to false, loading is now set to true during the time required to communicate with the server. When the communication has completed successfully, the app state changes again but in this case, loading is set to false and the data can be found in our store. If the server responds with an error, then we handle that by navigating to the error page but also dispatching another action that will result in changing the app state accordingly by setting loading to false but also adding the error to the app state.
Now our application has a central storage of all the data needed and the components just have to select what they need to work properly. 
