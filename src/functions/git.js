const gitRegex = /(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)(\/?|\#[-\d\w._]+?)$/;

const validateGithubUrl = (gitUrl) => {
  return gitRegex.test(gitUrl);
};

export { validateGithubUrl };
