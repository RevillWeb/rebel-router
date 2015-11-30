"use strict";

System.register([], function (_export) {
    return {
        setters: [],
        execute: function () {
            function validElementTag(tag) {
                return (/^[a-z0-9\-]+$/.test(tag)
                );
            }

            _export("validElementTag", validElementTag);
        }
    };
});