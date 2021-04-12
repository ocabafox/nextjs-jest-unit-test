const runSeed = async (knex, rerunMigration = false) => {
  if (!rerunMigration) {
    return await knex.seed.run();
  }
};

module.exports = {
  runSeed
};
