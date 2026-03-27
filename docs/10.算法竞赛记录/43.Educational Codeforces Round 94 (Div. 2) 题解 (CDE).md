---
title: Educational Codeforces Round 94 (Div. 2) 题解 (CDE)
date: 2020-08-26 08:41:00
permalink: /pages/022137/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

## C. Binary String Reconstruction

大意：字符串 `w` 是由字符串 `s` 转换过来的，其中 `w[i]` 为 `'1'` 当且仅当 `s[i-x]` 或者 `s[i+x]` 为 `'1'`。已知 `w`，求 `s`。

容易得知 `s[i]` 为 `'0'` 的时候，`w[i-x]` 和 `w[i+x]` 一定都是 `'0'`。我们让这些位赋值为 `'0'`，其他位都是 `'1'`，然后检验一下。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
#define int ll
char s[N],ans[N];
void Solve(){
    scanf("%s",s); int n=strlen(s),x=read();
    repeat(i,0,n)ans[i]='1';
    repeat(i,0,n)
    if(s[i]=='0'){
        if(i-x>=0)ans[i-x]='0';
        if(i+x<n)ans[i+x]='0';
    }
    repeat(i,0,n)
    if(s[i]=='1'){
        if(i-x>=0 && ans[i-x]=='1');
        else if(i+x<n && ans[i+x]=='1');
        else{puts("-1"); return;}
    }
    repeat(i,0,n)putchar(ans[i]);
    puts("");
}
signed main(){
    //freopen("data.txt","r",stdin);
    int T=1; T=read();
    while(T--)Solve();
    return 0;
}
```

## D. Zigzags

大意：给定 $n$ 个数 $a_i$，求有多少个 $(i,j,k,l)$ 满足 $i<j<k<l$ 且 $a_i=a_k,a_j=a_l$。

> 看了一下 gyz 代码，我深刻认识到自己与神仙的差距。
> 统计每种值的前缀个数和后缀个数，遍历 j 和 k，直接可以算出 i 和 l 的个数。
> O(n^2)。
> 以下是原题解。

将 $a_i$ 看成颜色。首先固定两个颜色，然后让 $i,k$ 枚举第一个颜色，用 `lower_bound` 求出在第二个颜色集合中，$i,k$ 之间、$k,n$ 之间有多少数（即计算 $j,l$ 的方案数），相乘。

特判一下 $a_i=a_j=a_k=a_l$ 的情况。

（我对所有颜色集合排了个序，然后查找就小的集合往大的集合找，可以加速，不知道不加速能不能过。）

复杂度我也不知道。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=3010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
#define int ll
vector<int> a[N];
ll ans;
void work(const vector<int> &a,const vector<int> &b){
    repeat(i,0,a.size()){
        int p1=lower_bound(b.begin(),b.end(),a[i])-b.begin();
        repeat(j,i+1,a.size()){
            int p2=lower_bound(b.begin(),b.end(),a[j])-b.begin();
            ans+=(p2-p1)*p1+(p2-p1)*(b.size()-p2);
        }
    }
}
void Solve(){
    int n=read(); ans=0;
    repeat(i,1,n+1)a[i].clear();
    repeat(i,1,n+1){
        int t=read();
        a[t].push_back(i);
    }
    sort(a+1,a+n+1,[](const vector<int> &a,const vector<int> &b){
        return a.size()<b.size();
    });
    repeat(i,1,n+1)sort(a[i].begin(),a[i].end());
    repeat(i,1,n+1){
        repeat(j,i+1,n+1)
            work(a[i],a[j]);
        if(a[i].size()>=4){
            int n=a[i].size();
            ans+=n*(n-1)*(n-2)*(n-3)/(2*3*4);
        }
    }
    printf("%lld\n",ans);
}
signed main(){
    //freopen("data.txt","r",stdin);
    int T=1; T=read();
    while(T--)Solve();
    return 0;
}
```

## E. Clear the Multiset

大意：给定 n 个数 ai，操作 1：选择一个区间，每个数减 1；操作 2：选择一个数，变为任意比原来小的数。求把所有数变成 0 的最小操作数。

dp，我一直在死磕贪心，最终还是没做出来，还是 zkx 告诉我的 dp 呜呜呜。

`dp[i][j]` 表示处理到第 i 个数，j 个操作 1 仍然有效的答案。

显然，处理到第 i 个数时，我们可以用操作 1 解决 ai，也可以用操作 2 解决 ai。如果用了操作 2，那么状态转移方程 `dp[i][min(a[i],j)]=dp[i-1][j]+1`，这个 min 是因为最多只能存 `a[i]` 个操作 1，多余的操作 1 肯定失效了。如果用了操作 1，（注意这种情况只有 `a[i]<=n` 的时候才会考虑，不然 re）那么状态转移方程 `dp[i][a[i]]=dp[i-1][j](j>=a[i]),dp[i][a[i]]=dp[i-1][j]+a[i]-j(j<a[i])`，后面那个 `a[i]-j` 是补齐不够的操作 1。

> 官方题解不是 dp，容我观摩一下。
> 题解说，对于一个区间，我们要么用操作 2 删掉每个数（代价为区间长度），要么不断用操作 1 直到最小的那个数变成 0 然后对剩下的两个区间进行同样操作，这两个方案取 min 即可。
> 这个操作是 $O(n^2)$ 的。显然瓶颈主要在 RMQ 问题上，如果用线段树或者 st 表维护区间最小值的下标，那么可以优化到 $O(n\log n)$。当然如果骚一点是可以 $O(n)$ 的（指笛卡尔树优化 Four Russian 算法）。

不是 dp 的代码：（没优化，$O(n^2)$）

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=5010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
#define int ll
int a[N];
int work(int l,int r,int base){
    if(l>r)return 0;
    int p=min_element(a+l,a+r+1)-a;
    return min(r-l+1,
        work(l,p-1,a[p])+a[p]-base+work(p+1,r,a[p]));
}
void Solve(){
    int n=read();
    repeat(i,0,n)a[i]=read();
    printf("%lld\n",work(0,n-1,0));
}
signed main(){
    //freopen("data.txt","r",stdin);
    int T=1; //T=read();
    while(T--)Solve();
    return 0;
}
```

dp 代码：

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=5010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
#define int ll
int a[N],dp[N][N];
#define MIN(x,y) x=min(x,y)
void Solve(){
    int n=read();
    repeat(i,1,n+1)a[i]=read();
    repeat(j,1,n+1)dp[0][j]=j;
    repeat(i,1,n+1){
        repeat(j,0,n+1)dp[i][j]=inf;
        repeat(j,0,n+1)MIN(dp[i][min(a[i],j)],dp[i-1][j]+1);
        if(a[i]<=n)
        repeat(j,0,n+1)
        if(j>=a[i])
            MIN(dp[i][a[i]],dp[i-1][j]);
        else
            MIN(dp[i][a[i]],dp[i-1][j]+a[i]-j);
    }
    ll ans=inf;
    repeat(j,0,n+1)ans=min(ans,dp[n][j]);
    printf("%lld\n",ans);
}
signed main(){
    //freopen("data.txt","r",stdin);
    int T=1; //T=read();
    while(T--)Solve();
    return 0;
}
```
