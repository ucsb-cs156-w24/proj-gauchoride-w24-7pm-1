name: 99 - Copy issues from starter repo


env:
    GH_TOKEN: ${{ github.token }}
    STARTER: https://github.com/ucsb-cs156/proj-gauchoride
on:
  workflow_dispatch:

jobs:
  initialize:
    name: List Issues to JSON
    runs-on: ubuntu-latest
    outputs:
        issues: ${{ steps.get-issues.outputs.issues }}  

    steps:
      - uses: actions/checkout@v3
            
      - name: List Issues
        id: get-issues
        run: |
          GH_REPO=${{env.STARTER}} gh issue list -s open -l M23 --json number,title,body,labels | jq '[ ( .[] | { number: .number, title: .title , body: .body, labels: ( .labels | [ .[].name ] | join(",") )  } ) ]' > issues.json          
          cat issues.json
          {
               echo 'issues<<THIS_IS_THIS_EOF_MARKER'
               cat issues.json
               echo THIS_IS_THIS_EOF_MARKER
          } >> "$GITHUB_OUTPUT"
          
          # The following line can be uncommented for a simple test of later stages
          # echo 'issues=[{"title":"test", "number": 1, "body": "test body", "labels" : "a,b"}]' >> "$GITHUB_OUTPUT"   

  addIssuesToRepo:
    name: Add issue (${{ matrix.value.number }}) to repo 
    runs-on: ubuntu-latest
    needs: [initialize]

    env:
      destination: target/site/apidocs  
    strategy:
      matrix:
        value: ${{ fromJSON(needs.initialize.outputs.ISSUES)}}

    steps:
      - name: Checkout repo
        uses: actions/checkout@v3.5.2
         
      - name: Create issue
        uses: dacbd/create-issue-action@main
        with:
            token: ${{ github.token }}
            title: ${{ matrix.value.title }}
            body: ${{ matrix.value.body }}
            labels: ${{ matrix.value.labels }}
        

 
           


    

        
