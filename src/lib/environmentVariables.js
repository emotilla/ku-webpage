const variables = {
    hasura_url: import.meta.env.VITE_HASURA_URL,
    hasura_admin_secret: import.meta.env.VITE_HASURA_ADMIN_SECRET,
    bot_url: import.meta.env.VITE_BOT_URL
};

export { variables as default };