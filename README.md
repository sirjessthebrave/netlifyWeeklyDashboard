### Netlify Weekly Dashboard

**Current Assumptions and Reasoning**
- The data structure has no real bearing on true data. Since I didn't know what existing API's might have or what customers might be interested, I took the recommendations from the directions as well as potential stats I would be interested in as someone who hosts multiple websites.
- I first started with vanilla JS and CSS - this was to work though the concept of my dashboard without having to do a ton of setup before my thoughts were clear - you can see this work in the `firstStepWorkingFiles`. Once I got an idea of where I was going I decided to port the concept into a Jekyll blog, mostly because of ease of set up and knowledge of the technology (I have multiple Jekyll blogs setup so I could copy over their configs). 
- there are two siteInfo.json files where the data lives - please update both if you want to see the site with more/different data.

**Improvements**
- Find out what users actually want from this kind of dashboard and what data Netlify currently has access to.
- Port this over to a full JS framework (react ect) to take advantage of the more robust features.
- Add some branding and styling to match Netlify's sites more closely.
- Simplify the calculations for the graphs or look into a more powerful graphing library (d3?) to give users a better look into their data.
- Give each site it's own more detailed page or view after clicking on that site's card. This would give the user a more refined look into that site's specific stats.
- Make sure there is only one data source (right now data/siteInfo.json and assets/js/siteInfo.json have to be updated manually - make this copying happen automatically or deploy the data to a CDN/call from API)

**How would you approach implementing a news feed like this, and what would you have to consider when developing this to work across a range of browsers and devices?**

- I started by asking myself what I would want out of a dashboard of the activity of my sites. I would want to see a quick view of important info for each site, then maybe some context or comparison based off what the site activity usually is. Then came the data structure, since I didn't have much to go on I kep it simple! Generally I would not assume the data to be this clean or simple and that would be step two - looking at what I have, what I want, and what is the missing piece between those. Since you asked re. considering a broad range of devices I didn't want to go too fancy - so I kept with the JS and CSS basics. I kept a simple card layout with widths adjusting to screen width( 33,50, and 100% as the screen grew smaller). You can see I then got invested in a cool graph and didn't think about this graph at smaller screen sizes. Had I more time I would switch it so the bars line up horizontally instead of vertically since that is easier to scale to smaller screens. 


**How would you turn this news feed into an email newsletter?**

- Email newsletters are best kept simple and sweet. I would first again, want to know more about what users are most interested in, what data Netlify currently has, and what is missing. Then, clean and organize any data before knitting together and HTML email. Have some kind of template that is very simple - highlighting a few key data points and providing links to any more complicated graphics. Once the data is cleaned, I would consider the end technology used to build this app - will it stay a simple page as I have made it? Will it be ported over to a full framework? If so, does that framework have any build in helpers or libraries that can assist in sending emails to users? For example if the back end is Node, looking into a helper library such as: `https://github.com/niftylettuce/email-templates` or if services like MailChimp have API's where we could send data to be formatted properly. HTML emails are often quite finicky so I like to rely on companies/services that focus on them specifically and use their up to date templates! I would trigger the email service to run once a week with the general overview and links back to the user's dashboard. 

### Build
Build: JEKYLL_ENV=production jekyll build --watch
Serve: jekyll serve

