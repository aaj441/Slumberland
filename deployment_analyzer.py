#!/usr/bin/env python3
"""
Deployment Failure Analyzer for GitHub Repos on Railway
======================================================

This script analyzes deployment failures across your GitHub repositories
deployed on Railway, providing detailed failure analysis and remediation steps.

Requirements:
- GitHub Personal Access Token (classic)
- Railway CLI installed and authenticated
- Python 3.7+

Usage:
    python deployment_analyzer.py
"""

import requests
import subprocess
import json
import re
import sys
import os
from typing import List, Dict, Optional, Tuple
from datetime import datetime, timedelta
import time

class DeploymentAnalyzer:
    def __init__(self, github_user: str, github_token: str):
        self.github_user = github_user
        self.github_token = github_token
        self.github_headers = {
            "Authorization": f"token {github_token}",
            "Accept": "application/vnd.github.v3+json",
        }
        self.railway_projects = {}
        
    def get_github_repos(self) -> List[Dict]:
        """Fetch all repositories for the GitHub user."""
        print(f"🔍 Fetching repositories for user: {self.github_user}")
        
        repos = []
        page = 1
        per_page = 100
        
        while True:
            url = f"https://api.github.com/users/{self.github_user}/repos"
            params = {
                "per_page": per_page,
                "page": page,
                "type": "owner",
                "sort": "updated"
            }
            
            try:
                response = requests.get(url, headers=self.github_headers, params=params)
                response.raise_for_status()
                page_repos = response.json()
                
                if not page_repos:
                    break
                    
                repos.extend(page_repos)
                page += 1
                
                # Rate limiting protection
                if 'X-RateLimit-Remaining' in response.headers:
                    remaining = int(response.headers['X-RateLimit-Remaining'])
                    if remaining < 10:
                        print(f"⚠️  Rate limit warning: {remaining} requests remaining")
                        
            except requests.exceptions.RequestException as e:
                print(f"❌ Error fetching GitHub repos: {e}")
                break
                
        print(f"✅ Found {len(repos)} repositories")
        return repos
    
    def get_railway_projects(self) -> Dict[str, str]:
        """Get Railway projects and their status."""
        print("🚂 Fetching Railway projects...")
        
        try:
            # Run railway status to get project info
            result = subprocess.run(
                ["railway", "status", "--json"],
                capture_output=True,
                text=True,
                timeout=30
            )
            
            if result.returncode == 0:
                projects_data = json.loads(result.stdout)
                for project in projects_data.get('projects', []):
                    self.railway_projects[project.get('name', '')] = project.get('id', '')
                print(f"✅ Found {len(self.railway_projects)} Railway projects")
            else:
                print(f"⚠️  Railway CLI error: {result.stderr}")
                
        except subprocess.TimeoutExpired:
            print("⚠️  Railway CLI command timed out")
        except FileNotFoundError:
            print("❌ Railway CLI not found. Please install it: https://docs.railway.app/develop/cli")
        except json.JSONDecodeError:
            print("⚠️  Failed to parse Railway CLI output")
        except Exception as e:
            print(f"⚠️  Error running Railway CLI: {e}")
            
        return self.railway_projects
    
    def get_railway_logs(self, project_name: str, lines: int = 100) -> str:
        """Fetch deployment logs from Railway for a specific project."""
        if project_name not in self.railway_projects:
            return "Project not found in Railway"
            
        project_id = self.railway_projects[project_name]
        
        try:
            # Get recent deployment logs
            result = subprocess.run(
                ["railway", "logs", "--project", project_id, "--lines", str(lines)],
                capture_output=True,
                text=True,
                timeout=60
            )
            
            if result.returncode == 0:
                return result.stdout
            else:
                return f"Error fetching logs: {result.stderr}"
                
        except subprocess.TimeoutExpired:
            return "Log fetch timed out"
        except Exception as e:
            return f"Error: {str(e)}"
    
    def analyze_logs(self, logs: str, repo_name: str) -> Dict[str, any]:
        """Analyze logs for common deployment failure patterns."""
        analysis = {
            "status": "unknown",
            "issues": [],
            "suggestions": [],
            "severity": "low"
        }
        
        if not logs or "Error" in logs or "error" in logs:
            analysis["status"] = "failed"
            analysis["severity"] = "high"
        
        # Common failure patterns
        failure_patterns = {
            "missing_env_vars": {
                "patterns": [
                    r"missing environment variable",
                    r"environment variable.*not set",
                    r"OPENAI_API_KEY.*not found",
                    r"API_KEY.*undefined",
                    r"required.*environment.*variable"
                ],
                "issue": "Missing required environment variables",
                "suggestions": [
                    "Add missing environment variables in Railway dashboard",
                    "Check your .env file is properly configured",
                    "Verify all required API keys are set"
                ]
            },
            "port_binding": {
                "patterns": [
                    r"port.*binding.*failed",
                    r"port.*not.*bound",
                    r"listen.*EADDRINUSE",
                    r"address.*already.*in.*use",
                    r"PORT.*environment.*variable"
                ],
                "issue": "Port binding issues",
                "suggestions": [
                    "Use process.env.PORT in your application",
                    "Don't hardcode port numbers",
                    "Check if another process is using the port"
                ]
            },
            "build_failure": {
                "patterns": [
                    r"build.*failed",
                    r"npm.*install.*error",
                    r"yarn.*install.*error",
                    r"pip.*install.*error",
                    r"dependency.*not.*found",
                    r"module.*not.*found"
                ],
                "issue": "Build process failed",
                "suggestions": [
                    "Check package.json/dependencies for errors",
                    "Update package-lock.json or yarn.lock",
                    "Verify all dependencies are compatible",
                    "Check for syntax errors in your code"
                ]
            },
            "database_connection": {
                "patterns": [
                    r"database.*connection.*failed",
                    r"connection.*refused",
                    r"database.*not.*found",
                    r"authentication.*failed",
                    r"connection.*timeout"
                ],
                "issue": "Database connection issues",
                "suggestions": [
                    "Check database credentials in environment variables",
                    "Verify database service is running",
                    "Check network connectivity to database",
                    "Verify database URL format"
                ]
            },
            "memory_issues": {
                "patterns": [
                    r"out.*of.*memory",
                    r"memory.*limit.*exceeded",
                    r"heap.*out.*of.*memory",
                    r"allocation.*failed"
                ],
                "issue": "Memory issues",
                "suggestions": [
                    "Optimize memory usage in your application",
                    "Consider upgrading Railway plan",
                    "Implement memory-efficient algorithms",
                    "Add memory monitoring"
                ]
            },
            "timeout_issues": {
                "patterns": [
                    r"timeout",
                    r"request.*timed.*out",
                    r"connection.*timeout",
                    r"operation.*timed.*out"
                ],
                "issue": "Timeout issues",
                "suggestions": [
                    "Increase timeout values in your application",
                    "Optimize slow database queries",
                    "Implement proper error handling for timeouts",
                    "Check external API response times"
                ]
            },
            "permission_issues": {
                "patterns": [
                    r"permission.*denied",
                    r"access.*denied",
                    r"unauthorized",
                    r"forbidden",
                    r"insufficient.*permissions"
                ],
                "issue": "Permission/authorization issues",
                "suggestions": [
                    "Check API key permissions",
                    "Verify service account permissions",
                    "Review authentication configuration",
                    "Check file system permissions"
                ]
            }
        }
        
        # Check for each failure pattern
        for pattern_type, pattern_info in failure_patterns.items():
            for pattern in pattern_info["patterns"]:
                if re.search(pattern, logs, re.IGNORECASE):
                    analysis["issues"].append(pattern_info["issue"])
                    analysis["suggestions"].extend(pattern_info["suggestions"])
                    analysis["status"] = "failed"
                    analysis["severity"] = "high"
                    break
        
        # Check for success indicators
        success_patterns = [
            r"deployment.*successful",
            r"build.*completed",
            r"server.*started",
            r"listening.*on.*port",
            r"application.*ready"
        ]
        
        for pattern in success_patterns:
            if re.search(pattern, logs, re.IGNORECASE):
                if analysis["status"] == "unknown":
                    analysis["status"] = "success"
                    analysis["severity"] = "low"
                break
        
        # Remove duplicate suggestions
        analysis["suggestions"] = list(set(analysis["suggestions"]))
        
        return analysis
    
    def get_repo_info(self, repo: Dict) -> Dict:
        """Extract relevant information from GitHub repo."""
        return {
            "name": repo["name"],
            "full_name": repo["full_name"],
            "description": repo.get("description", ""),
            "language": repo.get("language", "Unknown"),
            "updated_at": repo["updated_at"],
            "size": repo["size"],
            "stars": repo["stargazers_count"],
            "forks": repo["forks_count"],
            "is_private": repo["private"],
            "default_branch": repo["default_branch"]
        }
    
    def generate_report(self, repo_info: Dict, analysis: Dict, logs: str) -> str:
        """Generate a detailed report for a repository."""
        report = []
        report.append(f"📁 Repository: {repo_info['name']}")
        report.append(f"🔗 Full Name: {repo_info['full_name']}")
        report.append(f"📝 Description: {repo_info['description'] or 'No description'}")
        report.append(f"💻 Language: {repo_info['language']}")
        report.append(f"⭐ Stars: {repo_info['stars']} | 🍴 Forks: {repo_info['forks']}")
        report.append(f"🔄 Last Updated: {repo_info['updated_at']}")
        report.append("")
        
        # Status
        status_emoji = {
            "success": "✅",
            "failed": "❌",
            "unknown": "❓"
        }
        report.append(f"Status: {status_emoji.get(analysis['status'], '❓')} {analysis['status'].upper()}")
        report.append(f"Severity: {analysis['severity'].upper()}")
        report.append("")
        
        # Issues
        if analysis["issues"]:
            report.append("🚨 Issues Found:")
            for issue in analysis["issues"]:
                report.append(f"  • {issue}")
            report.append("")
        
        # Suggestions
        if analysis["suggestions"]:
            report.append("💡 Remediation Suggestions:")
            for suggestion in analysis["suggestions"]:
                report.append(f"  • {suggestion}")
            report.append("")
        
        # Logs preview
        if logs and logs != "Project not found in Railway":
            log_lines = logs.split('\n')[-10:]  # Last 10 lines
            report.append("📋 Recent Logs (last 10 lines):")
            for line in log_lines:
                if line.strip():
                    report.append(f"  {line}")
            report.append("")
        
        report.append("=" * 60)
        return "\n".join(report)
    
    def run_analysis(self):
        """Run the complete deployment analysis."""
        print("🚀 Starting Deployment Failure Analysis")
        print("=" * 50)
        
        # Get GitHub repositories
        repos = self.get_github_repos()
        if not repos:
            print("❌ No repositories found or error occurred")
            return
        
        # Get Railway projects
        railway_projects = self.get_railway_projects()
        
        # Analyze each repository
        total_repos = len(repos)
        failed_deployments = 0
        successful_deployments = 0
        unknown_status = 0
        
        print(f"\n🔍 Analyzing {total_repos} repositories...")
        print("=" * 50)
        
        for i, repo in enumerate(repos, 1):
            repo_info = self.get_repo_info(repo)
            repo_name = repo_info["name"]
            
            print(f"\n[{i}/{total_repos}] Analyzing: {repo_name}")
            
            # Check if this repo is deployed on Railway
            if repo_name in railway_projects:
                print(f"  🚂 Found on Railway, fetching logs...")
                logs = self.get_railway_logs(repo_name)
                analysis = self.analyze_logs(logs, repo_name)
            else:
                print(f"  ⚠️  Not found on Railway")
                logs = "Not deployed on Railway"
                analysis = {
                    "status": "not_deployed",
                    "issues": ["Not deployed on Railway"],
                    "suggestions": ["Consider deploying this repository to Railway"],
                    "severity": "medium"
                }
            
            # Count statuses
            if analysis["status"] == "failed":
                failed_deployments += 1
            elif analysis["status"] == "success":
                successful_deployments += 1
            else:
                unknown_status += 1
            
            # Generate and display report
            report = self.generate_report(repo_info, analysis, logs)
            print(report)
            
            # Rate limiting protection
            time.sleep(0.5)
        
        # Summary
        print("\n" + "=" * 50)
        print("📊 ANALYSIS SUMMARY")
        print("=" * 50)
        print(f"Total Repositories: {total_repos}")
        print(f"✅ Successful Deployments: {successful_deployments}")
        print(f"❌ Failed Deployments: {failed_deployments}")
        print(f"❓ Unknown/Not Deployed: {unknown_status}")
        print(f"🚂 Railway Projects: {len(railway_projects)}")
        
        if failed_deployments > 0:
            print(f"\n🔧 {failed_deployments} repositories need attention!")
        else:
            print("\n🎉 All analyzed deployments are working correctly!")

def main():
    """Main function to run the deployment analyzer."""
    print("🔍 GitHub Repository Deployment Analyzer")
    print("=" * 50)
    
    # Get user input
    github_user = input("Enter your GitHub username: ").strip()
    if not github_user:
        print("❌ GitHub username is required")
        return
    
    github_token = input("Enter your GitHub Personal Access Token: ").strip()
    if not github_token:
        print("❌ GitHub token is required")
        return
    
    # Validate GitHub token
    try:
        response = requests.get(
            "https://api.github.com/user",
            headers={"Authorization": f"token {github_token}"}
        )
        if response.status_code == 401:
            print("❌ Invalid GitHub token")
            return
    except requests.exceptions.RequestException:
        print("❌ Error validating GitHub token")
        return
    
    # Create analyzer and run
    analyzer = DeploymentAnalyzer(github_user, github_token)
    analyzer.run_analysis()

if __name__ == "__main__":
    main()