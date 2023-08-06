# Contributing Guidelines

Thank you for considering contributing to the Imagine AI repository! Before making any changes, we kindly request that you discuss your proposed changes with the repository owners.

This can be done through an issue, email, or any other method of communication. It helps us align your contributions with the project's goals.

Please take a moment to review and follow our code of conduct, as we value fostering an inclusive and respectful environment for all contributors.

## Pull Request Process

To ensure smooth integration of your pull request, please adhere to the following steps:

1. Remove Unnecessary Dependencies: Before committing your changes, ensure that any install or build dependencies not required for the final build are removed.

2. Update the README: Provide clear and detailed explanations of the interface changes in the README.md file. This should include any new environment variables, exposed ports, useful file locations, and container parameters.

3. Versioning: If your pull request introduces changes that impact examples or the overall project, update the version numbers in relevant files (e.g., example files, README.md) following the SemVer versioning scheme.

4. Merge Approval: Before merging your pull request, kindly wait for approval from at least two other developers. If you lack permission to merge, please request a second reviewer to handle the merge on your behalf.

## Our Pledge

We are committed to fostering an open and welcoming environment in Imagine AI. Regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation, we pledge to create a harassment-free experience for everyone involved in our project and community.

## Our Standards for Contributions

We encourage behavior that cultivates a positive environment, such as:

- Using welcoming and inclusive language.
- Respecting differing viewpoints and experiences.
- Accepting constructive criticism with grace.
- Focusing on what is best for the community.
- Showing empathy towards other community members.

Conversely, unacceptable behavior includes:

- The use of sexualized language or imagery and unwelcome sexual attention or advances.
- Trolling, making derogatory comments, and engaging in personal or political attacks.
- Harassment, whether public or private.
- Publishing others' private information without explicit permission.
- Any other conduct that could reasonably be considered inappropriate in a professional setting.

# How to Contribute?

If you are unfamiliar with the command line, you can find tutorials using GUI tools in the section below.

If git is not installed on your machine, please follow the instructions [here](https://help.github.com/articles/set-up-git/) to install it.

![fork this repository](https://firstcontributions.github.io/assets/Readme/fork.png)

**1. Fork this repository:**
Begin by clicking the "Fork" button in the top right corner to create a copy of the Imagine AI repository under your GitHub account.

**2. Clone your forked copy of the project:**
Use the following command to clone the repository onto your local machine:

```
git clone https://github.com/<your_github_username>/Imagine_AI
```

**3. Navigate to the project directory:**
Move into the `imagine_ai` directory:

```
cd imagine_ai
```

**4. Add a reference (remote) to the original repository:**
This allows you to keep your fork in sync with the main repository:

```
git remote add upstream https://github.com/SurajPratap10/Imagine_AI
```

**5. Check the remotes for this repository:**
Confirm the remotes are set correctly with the following command:

```
git remote -v
```

**6. Keep your master branch up-to-date:**
Before you start working, take a pull from the upstream repository to ensure your master branch is in sync:

```
git pull upstream main
```

**7. Create a new branch:**
Create a new branch to work on your changes:

```
git checkout -b <your_branch_name>
```

**8. Make your desired changes to the codebase:**
Now you can make your changes and updates.

**9. Track your changes:**
Once you have made your desired changes, track them using:

```
git add .
```

**10. Commit your changes:**
Commit your changes with a meaningful message:

```
git commit -m "Your message"
```

**11. Push the committed changes to your remote repository:**
Push the changes to the branch you created on your fork:

```
git push -u origin <your_branch_name>
```

**12. Create a pull request:**
On GitHub, navigate to the main repository (SurajPratap10/Imagine_AI). Click on "compare and pull requests" to initiate a pull request. Make sure to compare your feature branch to the desired branch of the repository where you want to make the pull request.

**13. Add an appropriate title and description to your pull request:**
Clearly explain your changes and efforts in the pull request description.

**14. Click on "Create Pull Request":**
After verifying everything is correct, create the pull request.

**15. Congratulations!**
You have successfully made a pull request to Imagine AI.

**16. Review Process:**
Now, please patiently wait while your pull request is being reviewed.

<br>

## Thank you for contributing to Imagine AI!

- We genuinely appreciate all your contributions, whether big or small, Our contributors play a significant role in sustaining and expanding this amazing project.
