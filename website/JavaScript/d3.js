(function (w) {

    /**
     * D3 Object
     * @namespace d3
     * @version 0.0.1
     */
    w.d3 = w.d3 || {

        /**
         * Current Language from the Website
         * @type {string}
         * @global
         */
        Lang : 'en',

        /**
         * Main.Init call all functions you want ;)
         * @return void
         */
        init : function () {

            /**
             * Get Language from User
             */
            try {
                d3.Lang = window.navigator.userLanguage || window.navigator.language;
            } catch (e) {
                if (Main.Debug) {
                    console.log(e);
                }
            }

            
            /**
             * Fill Main object variables by these functions
             */
            Detection.CheckAll();
            

            // Set a trigger
            Main.trigger();

        }

    };

})(window);


/**
 * Init Main JavaScript Object
 */
if (typeof(jQuery) === 'undefined') {
    console.log('jQuery Framework is required!');
} else {

    $(document).ready(d3.init);

} // End of if