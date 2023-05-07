
* Source Repo: <https://github.com/{{site.repo}}>

## Documentation

<table>
<thead>
<tr>
<th colspan="3" style="text-align:center">Backend</th>
<th colspan="3" style="text-align:center">Frontend</th>
<th>Javadoc</th>
<th>Jacoco</th>
<th>Pitest</th>
<th>Storybook</th>
<th>Coverage</th>
<th>Stryker</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="{{pr.url}}">PR {{pr.number}}</a></td>
<td>{{pr.headRefName}}</td>
<td>{{pr.author.login}}</td>
<td><a href="prs/{{pr.number}}/javadoc">javadoc</a></td>
<td><a href="prs/{{pr.number}}/jacoco">jacoco</a></td>
<td><a href="prs/{{pr.number}}/pitest">pitest</a></td>
<td><a href="prs/{{pr.number}}/storybook">storybook</a></td>
<td><a href="prs/{{pr.number}}/coverage">coverage</a></td>
<td><a href="prs/{{pr.number}}/stryker">stryker</a></td>
</tr>
</tbody>
</table>


## Open Pull Requests

<style>
table, th, td {
  border: 1px solid black;
  padding: 2px;
  border-collapse: collapse;
}
tbody tr:nth-child(even) {background-color: #f2f2f2;}
</style>

<table>
<thead>
<tr>
<th colspan="3" style="text-align:center">Pull Request</th>
<th colspan="3" style="text-align:center">Backend</th>
<th colspan="3" style="text-align:center">Frontend</th>
</tr>
<tr>
<th>PR</th>
<th>Branch</th>
<th>Author</th>
<th>Javadoc</th>
<th>Jacoco</th>
<th>Pitest</th>
<th>Storybook</th>
<th>Coverage</th>
<th>Stryker</th>
</tr>
</thead>
<tbody>
{% for pr in site.pull_requests %}
<tr>
<td><a href="{{pr.url}}">PR {{pr.number}}</a></td>
<td>{{pr.headRefName}}</td>
<td>{{pr.author.login}}</td>
<td><a href="prs/{{pr.number}}/javadoc">javadoc</a></td>
<td><a href="prs/{{pr.number}}/jacoco">jacoco</a></td>
<td><a href="prs/{{pr.number}}/pitest">pitest</a></td>
<td><a href="prs/{{pr.number}}/storybook">storybook</a></td>
<td><a href="prs/{{pr.number}}/coverage">coverage</a></td>
<td><a href="prs/{{pr.number}}/stryker">stryker</a></td>
</tr>
{% endfor %}
</tbody>
</table>

**Note**: If links in the PR tables don't work, note the following:
* Backend links will not be updated for PRs that do not touch the backend code.
* Frontend links will not be updated for PRs that do not touch the frontend code.
* If a link doesn't work when you expect that it should, check that the appropriate [Github Actions](https://github.com/{{site.repo}}/actions) workflow completed successfully.
* You can also check the contents of the [gh-pages branch of this repo](https://github.com/{{site.repo}}/tree/gh-pages) to see if they were updated with the appropriate directory.
