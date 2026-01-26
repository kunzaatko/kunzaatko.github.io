# TODOs

- [-] [Hide the `nav` when reading](https://stackoverflow.com/questions/45825927/how-to-hide-side-nav-bar-using-html-and-css)
   - Here it is achieved: https://dharmx.is-a.dev/
- [-] Add a shortcode for linking sites and linking page see `sass/_anchors.scss`
- [x] Change the /resources/og_image.png to some my image
- [-] Change colours to https://github.com/Speyll/veqev
- [-] https://www.hostinger.com/tutorials/website-color-schemes
- [-] In the index page, there should be links to some useful tags. Something like "If you want to see some uncensored
  attempts at a real life problem that I encountered, see `(tag) uncensored`." etc.
- [x] In-front of "nav home button", put the icon of the site instead of the "home" icon
- [ ] Register on a some non-github free domain?! 
    - https://nic.eu.org/
    - https://github.com/is-a-dev/register (https://www.is-a.dev/)
- [-] add description shortcode: `<dl>` & `<dd>`
- [-] The callouts should have better colours and rounded corners?
    - callouts similar to the ones here https://www.howtocodeit.com/
- [-] Add rounded corners to the image enlargement on hover
- [x] Fix the tab name includes `<code>` and tags etc. Some `safe` is used badly here
- [-] Add a box around the description section in the blog page file. This way the description is recognizable from the
  content

- Features:
  - [ ] Anchor preview windows
    - For wikipedia, this can done using https://github.com/wikimedia/wikipedia-preview
    - Style of preview https://stackoverflow.com/questions/67277296/how-to-make-page-preview-popup-like-wikipedia
  - [ ] Anchor link destination icon (GitHub, Wikipedia, StackOverflow, Reddit etc.). Must be some kind of script to add
    the relevant class to the anchor and then add theming as a `pre` selector in the CSS classes.

- Blog pages:
  - [ ] The line under the title of the blog posts is too long if it contains markdown (there is a TODO note in the
    relevant section, which should be changed)
  - [ ] Make the updated date appear smaller or in different location than the written date

- Footer:
  - [x] Size of the logo in the nav bar is too large
  - [ ] Change the footer to contain the acknowledgement for the rust blog style
  - [ ] Text under RSS is not vertically centred correctly
  - [ ] Add GPG Key

- Comments:
  - [x] Comments for the blog posts
  - [x] Comments section is too wide
  - [x] Comments do not change theme with theme change

- Site structure:
  - [x] Change the directory structure to contain blog directory in content to allow for about, CV etc. pages
  - [x] Add icons chrome (as in DeepThought `icons` directory)
  - [x] Use `date` function for the printing of the date in the blog post and have a global config variable `dateformat`
    that will be used for this
  - [x] Move Font Awesome icons to the `fonts/` static directory.
  - [ ] The correct `nav` buttons should be determined based on the location within the site. Could be done in the
    `_index.md` headers for instance
  - [ ] Book recommendation section in the about and link to their Goodreads or StoryBlocks reviews 
  - [ ] Add a link to the commit that the update and/or the creation happened
  - [ ] Fix the feed template and adjust it to the `date` function use
  - [ ] Fix: Changing to `feed.xml` with template not working because it takes paths that should not be in the feed.
    Research the feed section in the zola documentation.
  - [ ] Determine the path based on the date in the page itself?

- Block code theming:
  - [x] Change the theming of code blocks
  - [ ] Ability to add links to the source of the codeblocks i.e. when I hover over the codeblock, the link appears to
    the source in the Github repo and over the lines. This possibly may have to be done in zola itself.
  - [ ] Ability to add a filename to the codeblock above the block
  - [ ] When including line-numbers in the code blocks they are not nicely styled and aligned
  - [ ] The title of the codeblock does not show
  - [ ] Codeblocks that are collapsible 
    - Define a macro for this? Collapsible NOTEs, WARNINGs, etc. and code blocks 
  - [ ] Define a macro for terminal output

- Theme and Style
 - [ ] Try add a similar highlighter under the title of the site "The Random Sampler" that expands on load to the ones
   that are in the blog post titles
 - [ ] Change Julia in codeblocks to JuliaMono font (should be an easy fix within the SCSS)

# Inspiration
- https://dharmx.is-a.dev/ (really it is the Dolt Hugo theme)
  - table of contents that is active on the side and shows what section the reader is on when scrolling
  - Side navigation
  - Hiding TOC
  - `details`
  - Nice search
  - Hiding navigation when reading
  - Nice mobile layout and sizes
  - Nicely implemented comments
  - Under the blog, link to WhatsApp chat that pre-fills the description... Something similar with e-mail?
  - List the blog pages under year written in the blog listing
- https://github.com/Speyll/veqev | https://www.hostinger.com/tutorials/website-color-schemes <23-03-24> 
  - Nice colours for a selection of the secondary colours
- https://www.zelicko.dev/about/
