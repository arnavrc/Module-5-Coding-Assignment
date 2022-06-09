$(function() { // Same as document.addEventListener("DOMContentLoaded"...

    // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
    $("#navbarToggle").blur(function(event) {
        var screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            $("#collapsable-nav").collapse('hide');
        }
    });
});

// Show loading icon inside element identified by 'selector'.
var showLoading = function(selector) {
    var html = "<div class='text-center'>";
    html += "<img src='/Users/arnavroychoudhury/Documents/Assignment HTML CSS JAVASCRIPT/Assignment 4a/images/ajax-loader.gif'></div>";
    insertHtml(selector, html);
};
document.addEventListener("DOMContentLoaded", function(event) {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
        allCategoriesUrl, buildAndShowHomeHTML, // ***** <---- TODO: STEP 1: Substitute [...] ******
        true); // Explicitely setting the flag to get JSON from server processed into an object literal
});
dc.loadMenuCategories = function() {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
        allCategoriesUrl,
        buildAndShowCategoriesHTML);
};


// Load the menu items view
// 'categoryShort' is a short_name for a category
dc.loadMenuItems = function(categoryShort) {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
        menuItemsUrl + categoryShort,
        buildAndShowMenuItemsHTML);
};

function buildAndShowMenuItemsHTML(categoryMenuItems) {
    // Load title snippet of menu items page
    $ajaxUtils.sendGetRequest(
        menuItemsTitleHtml,
        function(menuItemsTitleHtml) {
            // Retrieve single menu item snippet
            $ajaxUtils.sendGetRequest(
                menuItemHtml,
                function(menuItemHtml) {
                    // Switch CSS class active to menu button
                    switchMenuToActive();

                    var menuItemsViewHtml =
                        buildMenuItemsViewHtml(categoryMenuItems,
                            menuItemsTitleHtml,
                            menuItemHtml);
                    insertHtml("#main-content", menuItemsViewHtml);
                },
                false);
        },
        false);
}
global.$dc = dc;

(window);