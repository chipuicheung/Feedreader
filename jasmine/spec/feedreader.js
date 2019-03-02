/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS feeds definitions, the allFeeds variable in our application. */
    describe('RSS Feeds', function() {
        // This tests makes sure the allFeeds variable has been defined and that it is not empty.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // This test ensures all feeds have an url and the url is not empty
        it('all feeds should have an url', function() {
          for(let feed of allFeeds) {
            expect(feed.url).toBeDefined();
            expect(feed.url.length).not.toBe(0);
          }
        });

        // This test ensures all feeds have a name and the name is not empty
      it('all feeds should have a name', function () {
        for (let feed of allFeeds) {
          expect(feed.name).toBeDefined();
          expect(feed.name.length).not.toBe(0);
        }
      });
    });

    describe('The menu', function() {
      // This test checks if the menu is hidden when you first open the application (default)
      it('should be hidden by default', function() {
        let body = document.querySelector('body')
        expect(body).toHaveClass('menu-hidden');
      });

      // Tests if the menu toggles on and off when you click the menu icon.
      it('should be visible when menu icon is clicked and hide again when clicked again', function() {
        let body = document.querySelector('body');
        // Click first time should open menu
        $('.menu-icon-link').click();
        expect(body).not.toHaveClass('menu-hidden');
        //Click second time should hide menu
        $('.menu-icon-link').click();
        expect(body).toHaveClass('menu-hidden');
      });
    });

    describe('Initial Entries', function() {
      beforeEach(function(done) {
        loadFeed(0, done);
      });
      // When feed is loaded, check if entries are there
      it('completes its work', function(){
        let entry = document.querySelectorAll('.feed .entry');
        expect(entry.length).toBeGreaterThan(0);
      });

    });


  describe('New Feed Selection', function () {
    // Test if new feed is loaded by comparing the content first the first feed
    beforeEach(function(done) {
      let feed = document.querySelectorAll('.feed');
      loadFeed(0);
      let firstEntries = [];
      for (let firstEntry of feed) {
        firstEntries.push(feed.innerHTML);
      };
      done();
    });

    it('content changes when new feed is loaded', function(done) {
      let feed = document.querySelectorAll('.feed');
      let newEntries = [];
      loadFeed(1);
      for (let newEntry of feed) {
        newEntries.push(feed.innerHTML);
      }
      expect('newEntries').not.toEqual('firstEntries');
      done();
    });
  });
}());
