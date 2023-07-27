import Server from "./Handlers/Server";

(async () => {
    // refresh configs
    await ConfigCache.Initialize();
    await ConfigCache.RefreshCache();

    await Server.Initialize();
})();