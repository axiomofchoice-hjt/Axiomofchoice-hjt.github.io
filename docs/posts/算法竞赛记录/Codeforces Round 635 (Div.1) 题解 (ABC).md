---
title: Codeforces Round 635 (Div.1) 题解 (ABC)
date: 2020-04-16 22:55:00
permalink: /pages/68edf5/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

[比赛链接](https://codeforces.com/contest/1336)

## A. Linova and Kingdom

贪心

显然不会出现某个旅游城市的父亲是工业城市的情况（因为它俩交换一下就会有更大收益），因此最优解一定是工业城市远离根，旅游城市靠近根。

在上述情况下尝试着把一个（父亲是旅游城市的）工业城市变成旅游城市（好绕啊），会发现 happiness 变化量等于这个结点为根的子树大小，减去这个结点的深度。

因此让所有城市刚开始都是工业城市，把根放入优先队列中，然后每次取出 happiness 变化量最大的结点并将其儿子放入优先队列中。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define vector basic_string
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll;
#define int ll
int sz[N],dep[N];
bool vis[N];
vector<int> a[N];
void dfs(int x){
    vis[x]=1;
    sz[x]=1;
    for(auto p:a[x])
    if(!vis[p]){
        dep[p]=dep[x]+1;
        dfs(p);
        sz[x]+=sz[p];
    }
}
int f(int x){
    return sz[x]-dep[x];
}
int n,k;
priority_queue<pair<ll,ll>> q;
signed main(){
    cin>>n>>k;
    repeat(i,0,n-1){
        int x,y; cin>>x>>y; x--,y--;
        a[x]+=y;
        a[y]+=x;
    }
    dep[0]=1;
    dfs(0);
    ll ans=0;
    q.push({f(0),0});
    fill(vis,vis+n,0);
    repeat(i,0,n-k){
        ans+=q.top().first;
        int x=q.top().second; q.pop(); vis[x]=1;
        for(auto p:a[x])
        if(!vis[p])
            q.push({f(p),p});
    }
    cout<<ans<<endl;
    return 0;
}
```

## B. Xenia and Colorful Gems

目前有两种方法（群里大佬说的 forforfor 可能是第三种方法但是我没听懂）。

首先对三个数组 a, b, c 排序，然后遍历数组 a，在数组 b 中二分查找出最接近 `a[i]` 的两个数（一个大于等于，一个小于等于）`b[j1], b[j2]`，然后在数组 c 中二分查找出最接近 `(a[i]+b[j1])/2` 的两个数 `c[k11], c[k12]`，以及最接近 `(a[i]+b[j2])/2` 的两个数 `c[k21], c[k22]`，更新一下答案（这样会更新 4 次）。最后，把数组 b 和 c 交换一下重复上述操作。

第二种方法优雅很多，即排序后每个数组弄一个指针（指向数组头），考虑三个指针向后移动的三个答案（没有真的移动），哪个答案小就移动哪个（这才是真的移动），边跑边更新答案。

两个方法都贴出来了。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const ll INF=~0ull>>2;
#define int ll
vector<int> a,b,c;
ll ans;
template<typename T> T sqr(const T &x){return x*x;}
void up(int x,int y,int z){
    ans=min(ans,sqr(x-y)+sqr(y-z)+sqr(z-x));
}
void work2(int A,int B,const vector<int> &c){
    int mid=(A+B)/2;
    int ci=lower_bound(c.begin(),c.end(),mid)-c.begin();
    if(ci!=(int)c.size())up(A,B,c[ci]);
    if(ci!=0)up(A,B,c[ci-1]);
}
void work(int A,const vector<int> &b,const vector<int> &c){
    int bi=lower_bound(b.begin(),b.end(),A)-b.begin();
    if(bi!=(int)b.size())work2(A,b[bi],c);
    if(bi!=0)work2(A,b[bi-1],c);
}
signed main(){
    int T; cin>>T;
    while(T--){
        ans=INF*2;
        {
            int n1,n2,n3,x; cin>>n1>>n2>>n3;
            a.clear(); b.clear(); c.clear();
            repeat(i,0,n1)cin>>x,a.push_back(x);
            repeat(i,0,n2)cin>>x,b.push_back(x);
            repeat(i,0,n3)cin>>x,c.push_back(x);
        }
        sort(a.begin(),a.end());
        sort(b.begin(),b.end());
        sort(c.begin(),c.end());
        repeat(i,0,a.size()){
            work(a[i],b,c);
            work(a[i],c,b);
        }
        cout<<ans<<endl;
    }
    return 0;
}
```

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const ll INF=~0ull>>2;
#define int ll
vector<int> a,b,c;
ll ans;
template<typename T> T sqr(const T &x){return x*x;}
int cal(int x,int y,int z){
    return sqr(x-y)+sqr(y-z)+sqr(z-x);
}
template<typename T>
int pcal(T x,T y,T z){
    return cal(*x,*y,*z);
}
signed main(){
    int T; cin>>T;
    while(T--){
        ans=INF*2;
        {
            int n1,n2,n3,x; cin>>n1>>n2>>n3;
            a.clear(); b.clear(); c.clear();
            repeat(i,0,n1)cin>>x,a.push_back(x);
            repeat(i,0,n2)cin>>x,b.push_back(x);
            repeat(i,0,n3)cin>>x,c.push_back(x);
        }
        sort(a.begin(),a.end());
        sort(b.begin(),b.end());
        sort(c.begin(),c.end());
        auto p1=a.begin(),p2=b.begin(),p3=c.begin();
        while(1){
            int now=INF*2; auto nowp=&p1; ans=min(ans,pcal(p1,p2,p3));
            if(p1!=a.end()-1 && pcal(p1+1,p2,p3)<now)now=pcal(p1+1,p2,p3),nowp=&p1;
            if(p2!=b.end()-1 && pcal(p1,p2+1,p3)<now)now=pcal(p1,p2+1,p3),nowp=&p2;
            if(p3!=c.end()-1 && pcal(p1,p2,p3+1)<now)now=pcal(p1,p2,p3+1),nowp=&p3;
            if(now==INF*2)break;
            (*nowp)++;
        }
        cout<<ans<<endl;
    }
    return 0;
}
```

## C. Kaavi and Magic Spell

这个是区间 dp，而且真的不难，不要被它的位置吓到了（~~我承认我被吓到了~~）。

首先把字符串 `T` 的尾部加上特殊字符让它的长度和 `S` 相等（比 `S` 还长更好，雾），然后考虑状态转移方程。

如果我们已经生成了 `T` 的某个子串 `t`，那么就可以把 `S[len(t)]` 插入 `t` 的前面或者后面，这时候要考虑是否匹配（即 `T` 中 `t` 的前面或者后面是否等于 `S[len(t)]`），方案数也随之转移。

因此 `dp[l][r]` 表示生成 `T[l..r]` 有多少方案数，就有 `dp[l][r] = dp[l+1][r] * [是否匹配] + dp[l][r-1] * [是否匹配]`（具体懒得写了，看代码吧）。

可以自上而下的记忆化搜索，也可以自下而上的标准动规（比赛时我记忆化写炸了所以换成 dp 了）。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=3010; typedef long long ll;
const int mod=(0?1000000007:998244353);
#define int ll
string s,t;
int rec[N][N],n,final;
signed main(){
    cin>>s>>t; t+=string(s.size()-t.size()+1,'?');
    n=s.size();
    repeat(i,0,n+1)rec[i][i]=1;
    repeat(len,1,n+1){
        repeat(l,0,n)
        if(l+len<=n){
            int r=l+len; //注意注意注意这里区间是左闭右开的，即 T[l..(r-1)]
            ll ans=0;
            if(t[l]=='?' || s[len-1]==t[l])ans+=rec[l+1][r];
            if(t[r-1]=='?' || s[len-1]==t[r-1])ans+=rec[l][r-1];
            rec[l][r]=ans%mod;
        }
    }
    repeat(i,0,n+1)
    if(t[i]=='?')
        final=(final+rec[0][i])%mod;
    cout<<final<<endl;
    return 0;
}
```

E1 想假了，等官方题解出来了再更新/kk。

更：我能看懂 E1 的题解，但是代码根本写不来，那就不更了 23333。
