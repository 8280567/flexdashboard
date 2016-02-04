

// TODO: bookmarking / push-state
// TODO: auto-dismiss responsive menu
// TODO: dygraphs visibilty
// TODO: subtitle region

// TODO: support for R plots
// TODO: support for runtime: shiny

$(document).ready(function () {

  // layout a dashboard page
  function layoutDashboardPage(page) {

    // find all the level2 sections (those are the rows)
    var rows = page.find('div.section.level2');
    rows.each(function () {

      // flag indicating whether we have any captions
      var haveCaptions = false;

      // remove the h2
      $(this).children('h2').remove();

      // convert into a bootstrap row
      $(this).addClass('row');

      // find all of the level 3 subheads
      var columns = $(this).children('div.section.level3');

      // see if need to compute a col-class
      var colClass = null;

      // do any of them specify a col- explicitly? If so
      // then the user is controlling the widths
      var explicitWidths = columns.filter('[class*=" col-"]').length > 0;
      if (!explicitWidths) {
        // get length and use that to compute the column size
        var numColumns = columns.length;

        // compute the col class
        var colWidth = 12 / numColumns;
        colClass = "col-sm-" + colWidth;
      }

      // fixup the columns
      columns.each(function() {

        // set the colClass
        if (colClass !== null)
          $(this).addClass(colClass);

        // mark as a grid element for custom css
        $(this).addClass('grid-element');

        // get a reference to the h3 and discover it's inner html
        var h3 = $(this).children('h3').first();
        var chartTitleHTML = h3.html();

        // remove the h3
        h3.remove();

        // put all the content in a chart wrapper div
        $(this).wrapInner('<div class="chart-wrapper">' +
                          '<div class="chart-stage"></div>' +
                          '</div>');

        // get a references to the chart wrapper and chart stage
        var chartWrapper = $(this).children('.chart-wrapper');
        var chartStage = chartWrapper.children('.chart-stage');

        // add the title
        var chartTitle = $('<div class="chart-title"></div>');
        chartTitle.html(chartTitleHTML);
        chartWrapper.prepend(chartTitle);

        // if there is more than one top level elements in
        // in chart stage then take the last element and
        // convert it into the chart notes (otherwise just
        // create an empty chart notes)
        var chartNotes = $('<div class="chart-notes"></div>');
        chartNotes.html('&nbsp;');
        if (chartStage.children().length > 1) {
          var lastChild = chartStage.children().last();
          if (lastChild.html().length > 0) {
            haveCaptions = true;
            chartNotes.html(lastChild.html());
          }
          lastChild.remove();
        }
        chartWrapper.append(chartNotes);
      });

      // if we don't have any captions in this row then remove
      // the chart notes divs
      if (!haveCaptions)
        $(this).find('.chart-notes').remove();
    });
  }

  // look for pages to layout
  var pages = $(this).find('div.section.level1');
  if (pages.length > 0) {

      // find the navbar
      var navbarList = $(this).find('ul.navbar-nav');

      // find the main container and envelop it in a tab content div
      var dashboardContainer = $('#dashboard-container');
      dashboardContainer.wrapInner('<div class="tab-content"></div>');

      pages.each(function(index) {

        // capture the id
        var id = $(this).attr('id');

        // add the tab-pane class
        $(this).addClass('tab-pane');
        if (index === 0)
          $(this).addClass('active');

        // get a reference to the h1, discover it's id and title, then remove it
        var h1 = $(this).children('h1').first();
        var pageTitleHTML = h1.html();
        h1.remove();

        // add an item to the navbar for this tab
        var li = $('<li></li>');
        if (index === 0)
          li.addClass('active');
        var a = $('<a></a>');
        a.attr('href', '#' + id);
        a.attr('data-toggle', 'tab');
        a.html(pageTitleHTML);
        li.append(a);
        navbarList.append(li);

        // lay it out
        layoutDashboardPage($(this));
      });

  } else {
    // remove the navbar and navbar button
    $('#navbar').remove();
    $('#navbar-button').remove();

    // layout the entire page
    layoutDashboardPage($(this));
  }
});

