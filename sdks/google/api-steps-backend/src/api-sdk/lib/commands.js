module.exports = {
    // Lineitem
    LineItem: {
        create: "lineitem/create",
        update: "lineitem/update",
        pauseOrResume: "lineitem/pause-resume",
        archiveOrUnarchive: "lineitem/archive-unarchive"
    },

    // Creative
    Creative: {
        create: "creative/create",
        update: "creative/update"
    },

    LineItemCreativeAsso: {
        create: "lineitem-creative-association/create"
    },

    // Company ( advertiser )
    Company:{
        create: "company/create"
    },

    // Order
    Order: {
        create: "order/create",
        approve: "order/approve",
        update: "order/update",
        pauseOrResume: "order/pause-resume",
        archiveOrUnarchive: "order/archive-unarchive"
    },

    Reporting: {
        runDeliveryReport: "reporting/run_delivery_report",
        runQueryReport: "reporting/run_query_report"
    },

    TargetingData: {
        getValuesByKeyIds: "targeting/get_values_of_keys",
        createCustomTargeting: "targeting/create_custom",
        getAllBrowsers: "targeting-data/get_all_browsers",
        getAllBrowserLanguages: "targeting-data/get_all_browser_languages",
        getAllDeviceCategories: "targeting-data/get_all_device_categories"
    }
};
