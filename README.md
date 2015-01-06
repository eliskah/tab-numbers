# Chrome Extension tab-numbers

If you are used to **switch between open tabs in Google Chrome** using CMD/CTRL+number of tab (eg. `CMD+4` for tab number 4), you are probably tired of visually counting the tabs you want to switch to. 

* Press `ALT+T` to see number of each tab.
* When you jump there, numbers are removed to free space for original title.

## Installation

Clone the repository:

    $ git clone https://github.com/eliskah/tab-numbers.git

In Google Chrome, go to extensions settings (settings > extensions or [extension settings](chrome://extensions)).

* Make sure you have checked developer mode.
* Click `Load unpacked extension..` and navigate to the extension.

## Usage

Once the extension is installed and you have some tabs open, press Alt+T. Titles of tabs will be prepended with the tab index. Please note two things:

* Some tabs (new tab, extension page, Chrome Webstore page, when you are displaying files etc.) can't have titles altered (at least for now).
* When focus is on new tab, activating of the function is not working.

Once you navigate to any other tab (using CMD/CTRL+index or by clicking), index are removed from the title.