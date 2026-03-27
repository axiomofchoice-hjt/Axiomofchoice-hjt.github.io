---
title: Codeforces Global Round 10 题解 (DEF)
date: 2020-08-17 09:35:00
permalink: /pages/b90d8e/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

## D. Omkar and Bed Wars

大意：n 个人站成一个圈，i 的右边是 i+1，n 的右边是 1。他们初始有一个朝向（朝左/右）。每次操作可以让一个人转向（左变右或相反）。要求不出现连续三个朝左或连续三个朝右的人，求最小操作数。

拿到题容易想到贪心。当时我仔细思考了亿年，觉得写起来麻烦得一批，于是投入 dp 的怀抱。

令 `dp[i][i1][i2][k1][k2]` 为前 i 个人的代价最小值，其中第 1 个人朝向 `i1`，第 2 个人朝向 `i2`，第 i-1 个人朝向 `k1`，第 i 个人朝向 `k2`。~~相信大家能一眼看出状态转移方程我就懒得讲了~~

复杂度 `O(16n)`。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define mst(a,x) memset(a,x,sizeof(a))
#define fi first
#define se second
//#define endl "\n"
mt19937 rnd(chrono::high_resolution_clock::now().time_since_epoch().count());
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf; const lf pi=acos(-1.0); lf readf(){lf x; if(scanf("%lf",&x)==-1)exit(0); return x;} typedef pair<ll,ll> pii; template<typename T> void operator<<(vector<T> &a,T b){a.push_back(b);}
const ll mod=(1?1000000007:998244353); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;}
#define int ll
int a[N]; char s[N];
int dp[N][2][2][2][2];
void Solve(){
    int n=read();
    scanf("%s",s);
    repeat(i,0,n)a[i]=s[i]=='R';
    repeat(i,0,n)
    repeat(i1,0,2)
    repeat(i2,0,2)
    repeat(k1,0,2)
    repeat(k2,0,2)
        dp[i][i1][i2][k1][k2]=inf;
    repeat(i1,0,2)
    repeat(i2,0,2){
        dp[1][i1][i2][i1][i2]=(a[0]!=i1)+(a[1]!=i2);
    }
    repeat(i,2,n)
    repeat(i1,0,2)
    repeat(i2,0,2)
    repeat(k1,0,2)
    repeat(k2,0,2)
    repeat(k3,0,2)
    if(!(k1==k2 && k2==k3)){
        dp[i][i1][i2][k2][k3]=min(dp[i][i1][i2][k2][k3],
            dp[i-1][i1][i2][k1][k2]+(a[i]!=k3));
    }
    ll ans=inf;
    repeat(i1,0,2)
    repeat(i2,0,2)
    repeat(k1,0,2)
    repeat(k2,0,2){
        if(!(k1==k2 && k1==i1))
        if(!(k2==i1 && k2==i2))
            ans=min(ans,dp[n-1][i1][i2][k1][k2]);
    }
    cout<<ans<<endl;
}
signed main(){
    //freopen("data.txt","r",stdin);
    int T=1; T=read();
    while(T--)Solve();
    return 0;
}
```

## E. Omkar and Duck

大意：（交互题）先告诉你 n，让你给出 `n×n` 的矩阵，然后 q 组询问，每次会给出矩阵中从右上到左下的某一最短路径上的数字之和，输出路径长什么样。

这题我写了两遍题解了，全都不满意删掉了，~~气死~~，直接上代码。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define mst(a,x) memset(a,x,sizeof(a))
#define fi first
#define se second
//#define endl "\n"
mt19937 rnd(chrono::high_resolution_clock::now().time_since_epoch().count());
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=30; typedef long long ll; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
#define int ll
int n,a[N][N]; //a即要输出的那个矩阵
pair<ll,ll> g[N][N]; //g[i][j]表示如果走到(i,j)这个位置，那么走过的数字之和一定在区间[g[i][j].first,g[i][j].second]内
//g[][]要求在所有左下-右上的斜线上的所有点，其值域两两不相同，并且单增
vector<pair<ll,ll>> ans;
void Solve(){
    int n=read();
    a[0][0]=0;
    g[0][0]={0,0};
    repeat(sum,1,n*2-1){ //遍历斜线
        int pre=-1;
        repeat(j,0,n)
        repeat(i,0,n)
        if(i+j==sum){ //处理斜线上的点
            int mn=INF,mx=-INF;
            if(i)mn=min(mn,g[i-1][j].fi),mx=max(mx,g[i-1][j].se);
            if(j)mn=min(mn,g[i][j-1].fi),mx=max(mx,g[i][j-1].se); //此时，[mn,mx]为前两个点的值域的并集
            g[i][j]={pre+1,pre+1+mx-mn}; //pre+1是为了与刚刚处理的点值域刚好不相交
            a[i][j]=g[i][j].fi-mn;
            pre=pre+1+mx-mn; //值域最大值
        }
    }
    repeat(i,0,n){
        repeat(j,0,n)
            printf("%lld ",a[i][j]);
        puts("");
    }
    fflush(stdout);
    int q=read();
    while(q--){
        ans.clear();
        int s=read(); int x=n-1,y=n-1; ans.push_back({x,y});
        while(x || y){ //模拟一遍，把路径模拟出来
            if(!x)y--;
            else if(!y)x--;
            else{
                s-=a[x][y];
                if(g[x-1][y].fi<=s && g[x-1][y].se>=s)
                    x--;
                else y--;
            }
            ans.push_back({x,y});
        }
        repeat_back(i,0,ans.size())
            printf("%lld %lld\n",ans[i].fi+1,ans[i].se+1);
        fflush(stdout);
    }
}
signed main(){
    //freopen("data.txt","r",stdin);
    int T=1; //T=read();
    while(T--)Solve();
    return 0;
}
```

## F. Omkar and Landslide

发生了一个恐怖的事情。

![img](https://img2020.cnblogs.com/blog/1860292/202008/1860292-20200817012059562-1611998920.png)

我 2020 年 1 月的时候随手出了一道题，当时是打算给 noip 提高组出题，并且锻炼一下出题能力。结果刚好和这题撞了，甚至输入输出格式也是一样的，唯一区别是我的 n 是 2e5，这题是 1e6，还有高度我是 1e9，这题是 1e12（有区别吗？）。

（当时觉得，从算法角度看，应该是不到 noip 提高组的难度的，也就写起来有点繁琐。）

芜湖，找来以前的代码直接嘿嘿嘿，老铁们我做得对吗。

大意：给出 n 个严格单调递增的数列，不断重复如下操作直到无法操作：选择一个 i 满足 `a[i+1]-a[i]>=2`，然后 `a[i+1]--; a[i]++;`。

憋说了，大模拟，莽就完了。先 `a[i]-=i`，然后模拟一个栈，每个元素表示一段相同的 `a[i]`，然后就是各种讨论，好烦啊，还能咋做捏。

我回来了。不是吧阿 sir，原来这题是我那题的简单版本，因为我的题目的初始序列是单调不减的，这题是单调递增的，那最终状态只与 `sum(a[i])` 有关。~~那为什么放 F 题位置啊喂！~~

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define mst(a,x) memset(a,x,sizeof(a))
#define fi first
#define se second
//#define endl "\n"
mt19937 rnd(chrono::high_resolution_clock::now().time_since_epoch().count());
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=1000010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf; const lf pi=acos(-1.0); lf readf(){lf x; if(scanf("%lf",&x)==-1)exit(0); return x;} typedef pair<ll,ll> pii; template<typename T> void operator<<(vector<T> &a,T b){a.push_back(b);}
#define int ll
int n,a[N];
vector<pii> s;
void Solve(){
    n=read();
    repeat(i,1,n+1)
        a[i]=read(),a[i]-=i;
    s.push_back({a[1],1});
    repeat(i,2,n+1){
        if(a[i]<s.back().first){
            s.push_back({a[i],i});
            continue;
        }
        if(a[i]==s.back().first)continue;
        while(s.size()>1 && a[i]-s.back().first>i-s.back().second){
            a[i]-=i-s.back().second;
            s.pop_back();
        }
        if(s.size()==1){
            int t=(a[i]-s.back().first)/(i-1+1);
            a[i]-=t*(i-1);
            s.back().first+=t;
        }
        if(a[i]==s.back().first)continue;
        int d=a[i]-s.back().first;
        pii t=s.back();
        if(s.size()==1)s.back().first++;
        else s.pop_back();
        s.push_back({t.first,t.second+d});
    }
    s.push_back({0,INF});
    int p=0;
    repeat(i,1,n+1){
        if(s[p+1].second==i)p++;
        printf("%lld ",s[p].first+i);
    }
    puts("");
}
signed main(){
    //freopen("data.txt","r",stdin);
    int T=1; //T=read();
    while(T--)Solve();
    return 0;
}
```
