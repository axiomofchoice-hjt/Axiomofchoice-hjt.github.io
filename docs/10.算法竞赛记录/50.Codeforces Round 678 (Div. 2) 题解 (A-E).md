---
title: Codeforces Round 678 (Div. 2) 题解 (A-E)
date: 2020-10-25 10:26:00
permalink: /pages/972d98/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

## A. Reorder

那个很复杂的东西就是 $a_1+a_2+...+a_n$。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
const int N=2000010; typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
#define int ll
void Solve(){
    int n=read(),m=read(),s=0;
    repeat(i,0,n)s+=read();
    cout<<(s==m?"YES":"NO")<<endl;
}
signed main(){
    //freopen("data.txt","r",stdin);
    int T=1; T=read();
    repeat(ca,1,T+1){
        Solve();
    }
    return 0;
}
```

## B. Prime Square

居然能填 0。每行留两个 1，其他都填 0 即可。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
const int N=2000010; typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
#define int ll
void Solve(){
    int n=read();
    repeat(i,0,n){
        repeat(j,0,n)
            printf("%d ",(i==j || (i+1)%n==j?1:0));
        puts("");
    }
}
signed main(){
    //freopen("data.txt","r",stdin);
    int T=1; T=read();
    repeat(ca,1,T+1){
        Solve();
    }
    return 0;
}
```

## C. Binary Search

先模拟一遍那个算法，算出 `a` , `b`（有 `a` 个位于 `pos` 前的数必须小于 `x`，有 `b` 个位于 `pos` 后的数必须大于 `x`）然后组合数计算一下（$A_{x-1}^{a}A_{n-x}^{b}A_{n-a-b-1}^{n-a-b-1}$）。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
const int N=2000010; typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
const ll mod=1000000007;
ll mul(ll a,ll b,ll m=mod){return a*b%m;}
ll qpow(ll a,ll b,ll m=mod){
    ll ans=1;
    for(;b;a=mul(a,a,m),b>>=1)
        if(b&1)ans=mul(ans,a,m);
    return ans;
}
#define int ll
struct CC{
    static const int N=100010;
    ll fac[N],inv[N];
    CC(){
        fac[0]=1;
        repeat(i,1,N)fac[i]=fac[i-1]*i%mod;
        inv[N-1]=qpow(fac[N-1],mod-2,mod);
        repeat_back(i,1,N)inv[i-1]=inv[i]*i%mod;
    }
    ll operator()(ll a,ll b){ //a>=b
        if(a<b || b<0)return 0;
        return fac[a]*inv[a-b]%mod*inv[b]%mod;
    }
    ll A(ll a,ll b){ //a>=b
        if(a<b || b<0)return 0;
        return fac[a]*inv[a-b]%mod;
    }
}C;
int n,x,pos,a,b;
void BinarySearch(){
    int l=0,r=n; a=b=0;
    while(l<r){
        int m=(l+r)/2;
        if(m==pos)l=m+1;
        else if(m<pos)l=m+1,a++;
        else r=m,b++;
    }
}
void Solve(){
    n=read(),x=read(),pos=read();
    BinarySearch();
    cout<<C.A(x-1,a)*C.A(n-x,b)%mod*C.A(n-a-b-1,n-a-b-1)%mod<<endl;
}
signed main(){
    //freopen("data.txt","r",stdin);
    int T=1; //T=read();
    repeat(ca,1,T+1){
        Solve();
    }
    return 0;
}
```

## D. Bandit in a City

大意：一棵树，每个节点上有一些好人，根节点有坏人。每回合每个好人会选择一个儿子节点并移动到那里，然后坏人也会这么做，不断重复直到所有人到了叶子节点。好人尽可能让被抓住的人最少，坏人尽可能让被抓住的人最多。问被抓几人。

显然，问题等价于好人全部转移到叶子后叶子人数的最大值。初始在某一节点的人最终可以走到该节点子树的任意叶子，所以策略是，尽可能让这个节点的人不去最拥挤的叶子。考虑 dfs，先处理这个节点的儿子的状态（总人数，叶子数，和局部答案），该节点的局部答案 = max(儿子的局部答案最大值, 总人数/叶子数(向上取整))。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
const int N=200010; typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
#define int ll
int cnt[N],sum[N],mx[N];
vector<int> a[N];
void dfs(int x){
    if(a[x].empty())cnt[x]=1;
    for(auto p:a[x]){
        dfs(p);
        sum[x]+=sum[p];
        mx[x]=max(mx[x],mx[p]);
        cnt[x]+=cnt[p];
    }
    mx[x]=max(mx[x],(sum[x]+cnt[x]-1)/cnt[x]);
}
void Solve(){
    int n=read();
    repeat(i,2,n+1){
        a[read()].push_back(i);
    }
    repeat(i,1,n+1)sum[i]=read();
    dfs(1);
    cout<<mx[1]<<endl;
}
signed main(){
    //freopen("data.txt","r",stdin);
    int T=1; //T=read();
    repeat(ca,1,T+1){
        Solve();
    }
    return 0;
}
```

## E. Complicated Computations

大意：给一个序列，所有非空区间的 mex 值组成了一个集合，问这个集合的 mex 值。

首先必须清楚一个概念，如果答案是 $k$，那么一定没有区间的 mex 值等于 $k$。也就是说，数字 $k$ 把整个序列划分为一些区间，如果对于这些区间，$1..(k-1)$ 没有都出现，那么就一定没有区间的 mex 值等于 $k$。

根据上述结论，思路就是让 $k$ 从 $1$ 开始增加，如果发现 $k$ 满足要求，直接输出 $k$。

那么问题就变成了，如何询问区间内 $1..(k-1)$ 有没有都出现呢？先预处理 `next[i]=(a[i]=a[j],j>i` 的最小 `j)`，然后根据 `a[i]` 从小到大的顺序把 `next[i]` 加到线段树里，线段树维护区间最大值。询问 `[x,y]` 里是否有 `1..(k-1)` 这些数字，就相当于询问线段树里 `[1,x-1]` 的最大值是否大于 `y`（特殊处理一下数字 `1..(k-1)` 第一次出现的位置，可以记为 `next[0]`）。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
const int N=200010; typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
#define int ll
struct seg{ //zkw线段树
    #define U(a,b) max(a,b)
    const ll a0=0;
    int n; ll a[1024*1024*4*2];
    void init(int inn){
        for(n=1;n<inn;n<<=1);
        repeat(i,0,n)a[n+i]=a0;
        repeat_back(i,1,n)up(i);
    }
    void up(int x){
        a[x]=U(a[x<<1],a[(x<<1)^1]);
    }
    void update(int x,ll k){
        x+=n; a[x]=max(a[x],k);
        while(x>>=1)up(x);
    }
    ll query(int l,int r){
        ll ans=a0;
        for(l+=n-1,r+=n+1;l^r^1;l>>=1,r>>=1){
            if(~l & 1)ans=U(ans,a[l^1]);
            if(r & 1)ans=U(ans,a[r^1]);
        }
        return ans;
    }
}tr;
map<int,int> mp;
int a[N],nxt[N];
vector<int> pos[N];
void Solve(){
    int n=read(); tr.init(n+3);
    repeat(i,1,n+3)pos[i].push_back(0);
    repeat(i,1,n+1){
        a[i]=read();
        pos[a[i]].push_back(i);
    }
    repeat(i,1,n+3)mp[i]=n+1;
    repeat(i,1,n+3)pos[i].push_back(n+1);
    repeat_back(i,1,n+1){
        nxt[i]=mp[a[i]];
        mp[a[i]]=i;
    }
    if((int)pos[1].size()==n+2){cout<<1<<endl; return;}
    repeat(i,1,n+3){
        if(i>1){
            int f=true;
            repeat(j,0,pos[i].size()-1){
                int x=pos[i][j],y=pos[i][j+1];
                if(tr.query(0,x)<y){f=false; break;}
            }
            if(f){cout<<i<<endl; return;}
        }
        repeat(j,1,pos[i].size()-1)
            tr.update(pos[i][j],nxt[pos[i][j]]);
        tr.update(0,mp[i]);
    }
}
signed main(){
    //freopen("data.txt","r",stdin);
    int T=1; //T=read();
    repeat(ca,1,T+1){
        Solve();
    }
    return 0;
}
```
