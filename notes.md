# NOTES

Pay attention to parent-directChildren relationship when setting widths.

Parent can set width of direct child, if direct child doesn't have content/children of its own that 
can cause overflow? 

You can set parent/ancestor's width, and successfully constrain descendants' widths.
Example 1:  
.grid width 40em --> main 40em --> section 100% --> .item-avatar 100px + .item-right 100% - 100px
--> <h3><a></a></h3>, p
Example 2: 
main 40em --> section null --> .item-avatar 100px + .item-right calc(100%-100px) --> <h3><a></a></h3> null, p null
Example 3: 
main 40em --> section null --> .item-avatar 100px + .item-right null --> <h3><a></a></h3> null, p null

--------------------------------------------------------------------------------
The parent container can increase in width if its children are wider than the parent. 
For example, 
.grid width 40em --> main 100% --> section 100% --> .item-avatar 100px + .item-right 100%
if I had the parent, main, at 100% (40em), and main had a child, .section, that had 
side-by-side avatar and text. And if the avatar's width was 100px, and the text's width was 100%, 
.section's width would have been 740px (640px + 100px). 
And parent's width also would become 740px.
This doesn't happen if you set main to a length value like 40em, though. 

40em vs 100%
.grid --> main
.grid { max-width: 40em; }
main { max-width: 40em ;} VS main { max-width: 100% }
em is more rigid. Even if main's descendants are wider than main, main's width will be 640px. 

--------------------------------------------------------------------------------
`inherit` vs 100%
https://stackoverflow.com/questions/9374509/width100-vs-widthinherit

`inherit` = the child gets the same value as the parent, which could be 50%. The child's width would 
be 50% of its parents' width.
100% = the child's width is 100% of its parents' width

--------------------------------------------------------------------------------
CSS Grid & Grid Items' Content

I set this rule: grid-template-columns: 1fr 1fr;
But instead of two equal sized columns, I got one skinny column, and 1 fat column.
The reason was that my first column items had content with only a few words. 
My second column items had content with a long sentence. 

Prevent content from expanding grid items
https://stackoverflow.com/questions/43311943/prevent-content-from-expanding-grid-items

By default, a grid item cannot be smaller than the size of its content.

Grid items have an initial size of min-width: auto and min-height: auto.

You can override this behavior by setting grid items to min-width: 0, min-height: 0 or overflow with any value other than visible.

.month-grid {
  display: grid;
  grid-template: repeat(6, 1fr);
  min-height: 0;  
  min-width: 0;  
}

.day-item {
  overflow: hidden;  
  min-width: 0;     
}

The Automatic Minimum Size of Flex Items
https://stackoverflow.com/questions/36247140/why-dont-flex-items-shrink-past-content-size

--------------------------------------------------------------------------------
GRID-TEMPLATE-COLUMNS VS GRID-AUTO-COLUMNS

This generates columns depending on width of viewport.
`grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));`
This doesn't. This only creates one column.
`grid-auto-columns: minmax(150px, 400px);`
Why? 

--------------------------------------------------------------------------------
PREVENT ITEMS FROM VERTICALLY STRETCHING TO FILL CONTAINER

Want the height of auto-rows to be the contents' height, not the flexible height of the parent container divided by the number of rows.

CSS Grid - Auto height rows, sizing to content
https://stackoverflow.com/questions/49701408/css-grid-auto-height-rows-sizing-to-content

--------------------------------------------------------------------------------
Nested CSS grid layout different behavior in Chrome and Firefox
https://stackoverflow.com/questions/48442629/nested-css-grid-layout-different-behavior-in-chrome-and-firefox

--------------------------------------------------------------------------------
Can't add margin-top to .main-grid
How to add spacing without HTML markup?
Use grid areas or grid lines?

--------------------------------------------------------------------------------

CSS LINKS
- https://alligator.io/css/flexbox-primer/ 
- https://css-tricks.com/snippets/css/complete-guide-grid/
