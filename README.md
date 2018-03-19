# Chrome Extension tab-numbers

If you are used to **switch between open tabs in Google Chrome** using CMD/CTRL+number of tab (eg. `CMD+4` for tab number 4), you are probably tired of visually counting the tabs you want to switch to. This is what you'll get:

![Preview of tab-numbers in Chrome](https://github.com/eliskah/tab-numbers/blob/master/preview.png)

* Press `ALT+T` to see number of each tab.
* When you jump there, numbers are removed to free space for original title.

## Installation

Clone the repository:

    $ git clone https://github.com/eliskah/tab-numbers.git

![Add tab-numbers to Chrome](https://github.com/eliskah/tab-numbers/blob/master/enable.png)

In Google Chrome, go to extensions settings (`settings > extensions` or go to `chrome://extensions`). Make sure you have checked developer mode, then `Load unpacked extension..` and navigate to the extension folder.

## Usage

Once the extension is installed and you have some tabs open, press Alt+T. Titles of tabs will be prepended with the tab index. Please note two things:

* Some tabs (new tab, extension page, Chrome Webstore page, when you are displaying files etc.) don't have titles altered (at least for now).
* When focus is on new tab, activating of the function is not working.

After you navigate to any other tab (using CMD/CTRL+index or by clicking), indexes are removed from the title.

If you want to use different keyboard shortcut, navigate to `chrome://extensions/configureCommands` and set it as you like.
