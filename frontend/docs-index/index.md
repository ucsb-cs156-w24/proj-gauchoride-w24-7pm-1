
* Source Repo: <https://github.com/{{site.repo}}>

## Documentation

* [Javadoc](javadoc)
* [Storybook](storybook)

## Open Pull Requests

<style>
table, th, td {
  border: 1px solid black;
  padding: 2px;
  border-collapse: collapse;
}
tr:nth-child(even) {background-color: #f2f2f2;}
</style>

<table>
<thead>
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

**Note**: If links in the PR tables don't work, note the following:
* Storybook links will not be updated for PRs that do not touch the frontend code.
* Javadoc links will not be updated for PRs that do not touch the backend code.
* If a link doesn't work when you expect that it should, check that the appropriate [Github Actions](https://github.com/{{site.repo}}/actions) workflow completed successfully.
* You can also check the contents of the [gh-pages branch of this repo](https://github.com/{{site.repo}}/tree/gh-pages) to see if they were updated with the appropriate directory.
