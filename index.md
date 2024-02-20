<style>
table, th, td {
  border: 1px solid black;
  padding: 2px;
  border-collapse: collapse;
}
tbody tr:nth-child(even) {background-color: #f2f2f2;}
</style>

* Source Repo: <https://github.com/{{site.repo}}>
* Github Actions: <https://github.com/{{site.repo}}/actions>

## Documentation

<table>
<thead>
<tr>
<th colspan="1" style="text-align:center">Backend</th>
<th colspan="1" style="text-align:center">Frontend</th>
</tr>
<tr>
<th>Javadoc</th>
<th>Storybook</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="javadoc">javadoc</a></td>
<td><a href="storybook">storybook</a></td>
</tr>
</tbody>
</table>

## Test Coverage

<table>
<thead>
<tr>
<th colspan="2" style="text-align:center">Backend</th>
<th colspan="2" style="text-align:center">Frontend</th>
</tr>
<tr>
<th>Jacoco</th>
<th>Pitest</th>
<th>Coverage</th>
<th>Stryker</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="jacoco">jacoco</a></td>
<td><a href="pitest">pitest</a></td>
<td><a href="coverage">coverage</a></td>
<td><a href="stryker/mutation.html">stryker</a></td>
</tr>
</tbody>
</table>


## Open Pull Requests

### Documentation

<table>
<thead>
<tr>
<th colspan="3" style="text-align:center">Pull Request</th>
<th colspan="1" style="text-align:center">Backend</th>
<th colspan="1" style="text-align:center">Frontend</th>
</tr>
<tr>
<th>PR</th>
<th>Branch</th>
<th>Author</th>
<th>Javadoc</th>
<th>Storybook</th>
</tr>
</thead>
<tbody>
{% for pr in site.pull_requests %}
<tr>
<td><a href="{{pr.url}}">PR {{pr.number}}</a></td>
<td>{{pr.headRefName}}</td>
<td>{{pr.author.login}}</td>
<td><a href="prs/{{pr.number}}/javadoc">javadoc</a></td>
<td><a href="prs/{{pr.number}}/storybook">storybook</a></td>
</tr>
{% endfor %}
</tbody>
</table>

### Test Coverage

<table>
<thead>
<tr>
<th colspan="3" style="text-align:center">Pull Request</th>
<th colspan="2" style="text-align:center">Backend</th>
<th colspan="2" style="text-align:center">Frontend</th>
</tr>
<tr>
<th>PR</th>
<th>Branch</th>
<th>Author</th>
<th>Jacoco</th>
<th>Pitest</th>
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
<td><a href="prs/{{pr.number}}/jacoco">jacoco</a></td>
<td><a href="prs/{{pr.number}}/pitest">pitest</a></td>
<td><a href="prs/{{pr.number}}/coverage">coverage</a></td>
<td><a href="prs/{{pr.number}}/stryker/mutation.html">stryker</a></td>
</tr>
{% endfor %}
</tbody>
</table>

## Notes

If links in the PR tables don't work, note the following:
* Backend links may not be updated for PRs that do not touch the backend code.
* Frontend links may not be updated for PRs that do not touch the frontend code.
* If a link doesn't work when you expect that it should, check that the appropriate [Github Actions](https://github.com/{{site.repo}}/actions) workflow completed successfully.
* You can also check the contents of the [gh-pages branch of this repo](https://github.com/{{site.repo}}/tree/gh-pages) to see if they were updated with the appropriate directory.
* Note that the pitest runs that are triggered by PRs and by workflow 2 compute
  incremental pitest results based on stored history.  It is rare, but this may
  occasionally be different from the results when doing a full pitest run from 
  scratch, which is done every time a push is made to the main branch (for example,
  when merging a PR).
