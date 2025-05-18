const chalk = require("chalk");
const fs = require("fs");

// Format date from ClickUp API
const formatDate = (dateStr) => {
    return dateStr ? new Date(Number(dateStr)).toLocaleDateString() : null;
};

// Handle server shutdown
function shutdown(server, code = 0) {
    // console.log(chalk.gray("🛑 Shutting down server..."));
    server.close((err) => {
        if (err) {
            console.error(chalk.red("❗ Error closing server:"), err);
            return process.exit(1);
        }
        // console.log(chalk.gray("✅ Server closed. Exiting..."));
        process.exit(code);
    });

    // Failsafe: Force quit if close hangs more than 2 seconds
    setTimeout(() => {
        // console.warn(chalk.yellow("⚠️  Force exiting..."));
        process.exit(code);
    }, 2000);
}

// Open browser for authentication
const openBrowser = async (url) => {
    try{
        const open = (await import('open')).default;
        await open(url);
    }
    catch (err){
        console.error(chalk.red("❗ Failed to open browser:", err.message));
    }
}

// Save environment variables to .env file
function saveEnvVars(envPath, clientId, clientSecret){
    const envContent = `CLICKUP_CLIENT_ID=${clientId}\nCLICKUP_CLIENT_SECRET=${clientSecret}`;
    fs.writeFileSync(envPath, envContent, { encoding: "utf-8" });
    console.log(chalk.green(`✅ Credentials saved to ${envPath}`));
}

// const connections = new Set();
// function shutdown(code = 0) {
//     console.log(chalk.gray("🛑 Shutting down server..."));
//
//     server.close((err) => {
//         if (err) {
//             console.error(chalk.red("❌ Error closing server:"), err);
//             return process.exit(1);
//         }
//         console.log(chalk.green("✅ Server closed successfully. Exiting..."));
//         process.exit(code);
//     });
//
//     // Log lingering connections after short delay
//     setTimeout(() => {
//         if (connections.size > 0) {
//             console.warn(chalk.yellow(`⚠️ ${connections.size} connection(s) still open:`));
//             for (const conn of connections) {
//                 console.log("👉 Connection details:", {
//                     localAddress: conn.localAddress,
//                     localPort: conn.localPort,
//                     remoteAddress: conn.remoteAddress,
//                     remotePort: conn.remotePort,
//                 });
//                 conn.destroy(); // force close
//             }
//         } else {
//             console.log(chalk.green("✅ No lingering connections."));
//         }
//     }, 1500);
//
//     // Final failsafe if things still don't exit
//     setTimeout(() => {
//         console.warn(chalk.red("💀 Force exiting process..."));
//         process.exit(code);
//     }, 3000);
// }

module.exports = {
    formatDate,
    shutdown,
    openBrowser,
    saveEnvVars,
}