import { v4 as uuidV4 } from "uuid";
import { uniqueNamesGenerator, names } from "unique-names-generator";

const config = {
  dictionaries: [names],
};

const randomStatus = () => {
  const statuses = ["pending", "processing", "success", "failed"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const randomEmail = (clientName) => {
  const domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  return `${clientName}@${randomDomain}`;
};

const payments = Array.from({ length: 100 }, (_) => {
  const randomName = uniqueNamesGenerator(config);

  return {
    id: uuidV4(),
    amount: Math.floor(Math.random() * 10000) / 100,
    status: randomStatus(),
    clientName: randomName,
    email: randomEmail(randomName.toLowerCase()),
  };
});

export { payments };
