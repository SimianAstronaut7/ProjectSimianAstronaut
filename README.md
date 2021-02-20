# Project_Simian_Astronaut
Creating a resource for researching stocks.

This project is heavily influenced by [RoaringKitty](https://www.youtube.com/c/RoaringKitty/videos). It attempts to duplicate and improve on the stock research workflow he demonstrated in his [earlier](https://www.youtube.com/watch?v=x2CBcthRVKE) [videos](https://www.youtube.com/watch?v=7wjWnMcdnlQ&t=3s).

The current workflow is heavily Chrome based. 

## Recommended Chrome Extensions

[Bypass-Paywalls](https://github.com/iamadamdev/bypass-paywalls-chrome)
* Many sites serve their content and then throw up a "Login" or "Subscribe" overlay. This works around that for many sites. 

[TamperMonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
* Allows for arbitrary JavaScript to be run on a page (we can transform, highlight, scroll, lookup info, etc.)
* Primary means of [scripting](https://github.com/SimianAstronaut7/Project_Simian_Astronaut/tree/main/GreaseMonkey) this project is using.
* Make sure to only take scripts that you understand from trusted sources as these are powerful (and potentially malicious).

[VideoSpeedController](https://chrome.google.com/webstore/detail/video-speed-controller/nffaoalbilbmmfgbnbgppjihopabppdk)
* Allows for fine grained (.1X increment) adjustments of a video's speed on most sites.

[ContextMenuSearch](https://chrome.google.com/webstore/detail/context-menu-search/ocpcmghnefmdhljkoiapafejjohldoga) 
* Used by RK, but I haven't personally used it much. 

[UBlockOrigin](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm)
* More effective blockers [exist](https://chrome.google.com/webstore/detail/umatrix/ogfcmafjalglgifnmanfmnieipoejdcf) but tend to break sites and require you to iteratively enable things until the site works. This is a good middle ground for less technical users.

## Custom "Search Engine" Setup

You can access your defined search engines [here](chrome://settings/searchEngines?search=search+engines). These allow for access via a keyword and then substitute the given search criteria into a URL. Here's an example. We've defined YahooFinance as having a keyword of yf:
![](https://github.com/SimianAstronaut7/Project_Simian_Astronaut/blob/main/img/SearchEngine_YahooFinance_Definition.PNG =250x)

Now we can quickly get to YahooFinance for any ticker. 
![](https://github.com/SimianAstronaut7/Project_Simian_Astronaut/blob/main/gif/SearchEngine_HotKey.gif =250x)


***TODO***: This is a good workflow, but could be better. 
* Lacks a way to open a bunch of tabs w/ some parameter (like Ticker) substituted in. 
* Bookmarklets (JavaScript in Bookmarks) + Search Engines using the bookmarklet code could give a quick way to do something like. But they get ugly (lots of escaping, single line, etc.). https://gist.github.com/uknj/266467926bb6bbf3dbb2c6e57d1c19d3 -> https://caiorss.github.io/bookmarklet-maker/ -> Search Engine definition
* I think the best way forward is probably an Extension for each keyword (https://developer.chrome.com/docs/extensions/reference/omnibox/). Would allow for arbitrary code execution based on a keyword. Nice for situations like say "hype", where we might want to put in the ticker, but have some translation to the actual company website via a YahooFinance lookup for something like an Alexa Rank. 


Import and export is a bit involved, but not terrible. 

***TODO*** Add details. 

## Bookmarks
As a primarily Chrome based workflow a lot of what RK does is based around the structure of the bookmarks he has and right-click -> Open All. As an example, fund managers are required to report on a quarterly basis all their holdings. So when that time comes he can browse all bookmarked funds quickly by Opening All, reading each one, then ctrl+W to close. 





## Disclaimer
I am not a financial professional. I am not endorsing any investment strategy. Personally, I  believe that if effort is invested it is possible to find stocks that have favorable risk/reward profiles. This may or may not be true. It is on individuals to make their own assessments. This project is for educational purposes only. 
