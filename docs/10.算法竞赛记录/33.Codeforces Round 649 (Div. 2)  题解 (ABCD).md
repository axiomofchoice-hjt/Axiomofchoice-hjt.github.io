---
title: Codeforces Round 649 (Div. 2)  题解 (ABCD)
date: 2020-06-14 09:11:00
permalink: /pages/85d739/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

<https://codeforces.ml/contest/1364>

## A. XXXXX

如果整个数列的和不被 `x` 整除，那正好，直接输出 `n`。

如果整个数列的和被 `x` 整除，这意味着我们需要不断去掉第一个元素直到不被 `x` 整除，或者不断去掉最后一个。两者选取较优方案。

如果这么做也无法不被 `x` 整除，那就 `-1`。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2;
#define int ll
int n,x,t,l,r,sum;
void solve(){
    cin>>n>>x; sum=0; l=inf,r=-inf;
    repeat(i,0,n){
        cin>>t;
        if(t%x!=0)l=min(l,i),r=max(r,i);
        sum+=t%x;
    }
    if(sum%x!=0){cout<<n<<endl; return;} //第一种情况
    if(l!=inf){cout<<max(n-l-1,r)<<endl; return;} //第二种情况
    cout<<-1<<endl; //第三种情况
}
signed main(){
    int T; cin>>T;
    while(T--){
        solve();
    }
    return 0;
}
```

## B. Most socially-distanced subsequence

显然只要保留所有“极值点”就行了。或者说，去掉所有满足 `p_{i-1}<p_i<p_{i+1}` 或者 `p_{i-1}>p_i>p_{i+1}` 的 `p_i`。

- 这是因为如果 `a<=b<=c` 或者 `a>=b>=c`，那么有 `|a-b|+|b-c|=|a-c|`。反过来也成立。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2;
#define int ll
int n,a[N],ans;
void solve(){
    cin>>n; ans=n;
    repeat(i,0,n)cin>>a[i];
    repeat(i,1,n-1)
    if((a[i-1]-a[i])*(a[i]-a[i+1])>0)
        ans--;
    cout<<ans<<endl;
    cout<<a[0]<<' ';
    repeat(i,1,n-1)
    if((a[i-1]-a[i])*(a[i]-a[i+1])<=0)
        cout<<a[i]<<' ';
    cout<<a[n-1]<<endl;
}
signed main(){
    int T; cin>>T;
    while(T--){
        solve();
    }
    return 0;
}
```

## C. Ehab and Prefix MEXs

每个 `a_i` 要求集合 `{b_1,b_2,...,b_i}` 包含 `[0,a_i-1]` 但不能包含 `a_i`。

我们发现如果 `i>a_i` ，那么很多 `b_j`（`j<=i`）暂时还不会用到（不能确定它的值），这时候可以考虑把这些还没赋值的 `b_j` 的位置保存起来，需要的时候再用。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2;
#define int ll
int n,a[N],ans[N];
vector<int> rec; //保存bj的位置
signed main(){
    cin>>n;
    repeat(i,0,n)cin>>a[i];
    int low=0;
    repeat(i,0,n){
        rec.push_back(i);
        repeat(j,low,a[i]){
            if(rec.empty())cout<<-1<<endl,exit(0);
            ans[rec.back()]=j,rec.pop_back();
        }
        low=a[i];
    }
    while(!rec.empty())ans[rec.back()]=1e6,rec.pop_back();
    repeat(i,0,n)cout<<ans[i]<<' ';
    return 0;
}
```

## D. Ehab's Last Corollary

类似的一题：<https://codeforces.ml/contest/1325/problem/F>。

这 F 题代码可以直接切 D 题。当然这 F 题太高级，不适合我这种 div5 选手，而且 D 题的条件宽了很多，练一下手还是挺不错的。

这题非常繁琐（但不难），分成三个部分。

1. 并查集判环（不必要，`n-1!=m` 就能判环）。
2. bfs 树找最小环。
3. 树的最大独立集。

因此我写了 70+ 行 qwq。

首先，子任务 2 是找环，那我们就找环。假设找到一个环了呢？那好像问题就结束了，因为如果环的长度不超过 `k` 那就输出环，否则输出环上不相邻的 `ceil(k/2)` 个点，~~美滋滋~~（然而并不，请看下一段）。

- 但是 wa（test 22）了之后我发现事情好像并不这么简单。我们要找的是无弦的环，即不存在一条边连接环上不相邻两点，否则求出的独立集就不是独立集了。一种方法是，找弦然后缩环，~~不知道可不可行~~。我的方法是，以某个点 S 为根建立 bfs 树，对于横叉边 AB，就可以形成 S-...-A-B-...-S 的环。这样，就能求出经过 S 的最小环。当然，而这个最小环一定无弦~~因为有弦就不是最小了~~（但是 S 附近是会出现重复经过点的情况，我们把它删掉即可）。解决问题。

如果无环，那说明是个树了。相信读者们对树的最大独立集再熟悉不过了，略。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2;
#define int ll
vector<int> a[N];
int n,m,k;
deque<int> rec; pair<int,int> record;
int dis[N],fa[N],ans=inf;
queue<int> q;
void bfs(int s){
    fill(dis,dis+n+1,-1); dis[s]=0;
    q.push(s); fa[s]=-1;
    while(!q.empty()){
        int x=q.front(); q.pop();
        for(auto p:a[x])
        if(p!=fa[x]){
            if(dis[p]==-1){
                dis[p]=dis[x]+1;
                fa[p]=x;
                q.push(p);
            }
            else{
                if(ans>dis[x]+dis[p]+1){
                    ans=dis[x]+dis[p]+1;
                    record={x,p};
                }
            }
        }
    }
}
signed main(){
    cin>>n>>m>>k;
    repeat(i,0,m){
        int x,y; cin>>x>>y;
        a[x].push_back(y);
        a[y].push_back(x);
    }
    if(n-1!=m){
        bfs(1);
        {
            for(int i=record.first;i!=1;i=fa[i])rec.push_front(i);
            for(int i=record.second;i!=1;i=fa[i])rec.push_back(i);
            int t=1;
            while(rec.front()==rec.back()){
                t=rec.front();
                rec.pop_front(),rec.pop_back();
            }
            rec.push_back(t);
        } 
        if((int)rec.size()<=k){
            cout<<2<<endl;
            cout<<rec.size()<<endl;
            for(auto i:rec)cout<<i<<' ';
        }
        else{
            cout<<1<<endl;
            repeat(i,0,(k+1)/2)
                cout<<rec[i*2]<<' ';
        }
    }
    else{
        bfs(1);
        int cnt=0;
        repeat(i,1,n+1)cnt+=dis[i]%2==1;
        int co=cnt>=(k+1)/2;
        repeat(i,1,n+1)
        if(dis[i]%2==co)
            rec.push_back(i);
        cout<<1<<endl;
        repeat(i,0,(k+1)/2)
            cout<<rec[i]<<' ';
    }
    return 0;
}
```
