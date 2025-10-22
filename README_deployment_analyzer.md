# Deployment Failure Analyzer

A comprehensive Python script that analyzes deployment failures across your GitHub repositories deployed on Railway, providing detailed failure analysis and remediation steps.

## Features

- 🔍 **GitHub Integration**: Fetches all your repositories using GitHub API
- 🚂 **Railway CLI Integration**: Retrieves deployment logs from Railway projects
- 🔧 **Smart Analysis**: Identifies common deployment failure patterns
- 💡 **Remediation Suggestions**: Provides specific fix recommendations
- 📊 **Detailed Reporting**: Generates comprehensive per-repo reports
- ⚡ **Rate Limiting Protection**: Handles API rate limits gracefully

## Prerequisites

1. **Python 3.7+**
2. **GitHub Personal Access Token** (classic)
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate a new token with `repo` scope
3. **Railway CLI** installed and authenticated
   - Install: `npm install -g @railway/cli`
   - Login: `railway login`

## Installation

1. Clone or download the script
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

Run the script:
```bash
python deployment_analyzer.py
```

The script will prompt you for:
- Your GitHub username
- Your GitHub Personal Access Token

## What It Analyzes

The script detects and provides solutions for:

### 🚨 Common Failure Patterns

1. **Missing Environment Variables**
   - Detects: `OPENAI_API_KEY`, `API_KEY`, etc.
   - Suggests: Add variables in Railway dashboard

2. **Port Binding Issues**
   - Detects: Port binding failures, hardcoded ports
   - Suggests: Use `process.env.PORT`, avoid hardcoded ports

3. **Build Failures**
   - Detects: npm/yarn install errors, dependency issues
   - Suggests: Check package.json, update lock files

4. **Database Connection Issues**
   - Detects: Connection refused, authentication failed
   - Suggests: Check credentials, verify database service

5. **Memory Issues**
   - Detects: Out of memory, heap allocation failures
   - Suggests: Optimize memory usage, upgrade plan

6. **Timeout Issues**
   - Detects: Request timeouts, connection timeouts
   - Suggests: Increase timeouts, optimize queries

7. **Permission Issues**
   - Detects: Access denied, unauthorized errors
   - Suggests: Check API keys, verify permissions

## Sample Output

```
📁 Repository: my-awesome-app
🔗 Full Name: aaj441/my-awesome-app
📝 Description: A cool web application
💻 Language: JavaScript
⭐ Stars: 5 | 🍴 Forks: 2
🔄 Last Updated: 2024-01-15T10:30:00Z

Status: ❌ FAILED
Severity: HIGH

🚨 Issues Found:
  • Missing required environment variables
  • Port binding issues

💡 Remediation Suggestions:
  • Add missing environment variables in Railway dashboard
  • Use process.env.PORT in your application
  • Don't hardcode port numbers

📋 Recent Logs (last 10 lines):
  Error: Missing environment variable OPENAI_API_KEY
  Port binding to 3000 failed
  Server not starting...
```

## Configuration

### Environment Variables (Optional)

You can set these environment variables to avoid prompts:

```bash
export GITHUB_USERNAME="your-username"
export GITHUB_TOKEN="your-token"
```

### Customizing Analysis Patterns

Edit the `failure_patterns` dictionary in the `analyze_logs` method to add custom failure detection patterns.

## Troubleshooting

### Railway CLI Issues
- Ensure Railway CLI is installed: `railway --version`
- Check authentication: `railway whoami`
- Verify project access: `railway status`

### GitHub API Issues
- Verify token has `repo` scope
- Check rate limits: Look for rate limit warnings in output
- Ensure username is correct

### Common Errors

1. **"Railway CLI not found"**
   - Install Railway CLI: `npm install -g @railway/cli`

2. **"Invalid GitHub token"**
   - Generate a new token with proper scopes
   - Ensure token is not expired

3. **"Rate limit exceeded"**
   - Wait for rate limit to reset
   - Consider using a token with higher limits

## Advanced Usage

### Analyzing Specific Repositories

Modify the script to analyze only specific repositories by filtering the `repos` list in the `get_github_repos` method.

### Custom Log Analysis

Add custom analysis patterns by extending the `failure_patterns` dictionary:

```python
"custom_pattern": {
    "patterns": [r"your.*custom.*pattern"],
    "issue": "Your custom issue description",
    "suggestions": ["Your custom suggestion"]
}
```

### Exporting Results

The script outputs to console by default. To save results to a file:

```bash
python deployment_analyzer.py > deployment_report.txt
```

## Contributing

Feel free to submit issues and enhancement requests! Common areas for improvement:

- Additional failure pattern detection
- Support for other deployment platforms
- Enhanced log parsing
- Better error categorization

## License

This script is provided as-is for educational and debugging purposes.