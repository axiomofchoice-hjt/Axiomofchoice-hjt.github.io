---
title: Codeforces Round 665 (Div. 2) 题解 (CDEF)
date: 2020-08-22 09:05:00
permalink: /pages/9c4366/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

## C. Mere Array

大意：给定一个序列，你可以交换两个数，要求这两个数的 `gcd` 等于整个序列的最小值。问是否可以让序列单调不下降。

显然，想要交换两个数 `a` , `b` ，我们可以让 `a` 与最小元素交换，再让 `b` 与最小元素交换，再让 `a` 与最小元素交换。因此，一个数能否自由移动，就看它与最小元素的 `gcd` 是否等于最小元素。我们把可以自由移动的数排个序就好了。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf; const lf pi=acos(-1.0); lf readf(){lf x; if(scanf("%lf",&x)==-1)exit(0); return x;} typedef pair<ll,ll> pii; template<typename T> void operator<<(vector<T> &a,T b){a.push_back(b);}
const ll mod=(1?1000000007:998244353);
#define int ll
int a[N],b[N];
void Solve(){
    int n=read(),f=1;
    repeat(i,0,n)
        a[i]=b[i]=read();
    int m=*min_element(a,a+n);
    sort(b,b+n);
    repeat(i,0,n)
    if(b[i]!=a[i] && __gcd(a[i],m)!=m)
        f=false;
    cout<<(f?"YES":"NO")<<endl;
}
signed main(){
    //freopen("data.txt","r",stdin);
    int T=1; T=read();
    while(T--)Solve();
    return 0;
}
```

## D. Maximum Distributed Tree

大意：给边赋值，使得所有不同的路径的边权之和之和最大。还要求边权之积等于 `k` 且边权里的 1 的数量最小。

首先，如果边权数不足 `n-1` ，那就补 1；如果边权数超过 `n-1` ，那就把最大的 `(边权数-n+2)` 个数删除，补上被删除的数乘积。这样边权数就是 `n-1` 了。

一条边的贡献为边权乘以（整个树被这条边分割成的两个子树大小的乘积）。我们先算出所有边权、统计次数，放到两个数组里，对这两个数组分别排个序，依次匹配（排序不等式）。

注意排序前不要取模！

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf; const lf pi=acos(-1.0); lf readf(){lf x; if(scanf("%lf",&x)==-1)exit(0); return x;} typedef pair<ll,ll> pii; template<typename T> void operator<<(vector<T> &a,T b){a.push_back(b);}
const ll mod=(1?1000000007:998244353);
#define int ll
vector<int> a[N],w,v;
int sz[N],n;
void dfs(int x,int fa=-1){
    sz[x]=1;
    for(auto p:a[x])if(p!=fa){
        dfs(p,x);
        v<<(sz[p]*(n-sz[p])); //"<<" means push_back
        sz[x]+=sz[p];
    }
}
void Solve(){
    n=read();
    repeat(i,1,n+1)a[i].clear(); w.clear(); v.clear();
    repeat(i,0,n-1){
        int x=read(),y=read();
        a[x]<<y; a[y]<<x; //"<<" means push_back
    }
    int m=read();
    repeat(i,0,m)w<<read(); //"<<" means push_back
    repeat(i,m,n-1)w<<1ll; //"<<" means push_back
    dfs(1);
    ll ans=0;
    sort(w.begin(),w.end());
    while((int)w.size()>n-1){
        int a=w.back(); w.pop_back();
        int b=w.back(); w.pop_back();
        w<<(a*b%mod); //"<<" means push_back
    }
    sort(v.begin(),v.end());
    repeat(i,0,n-1)ans+=v[i]%mod*w[i]%mod;
    ans%=mod;
    cout<<ans<<endl;
}
signed main(){
    //freopen("data.txt","r",stdin);
    int T=1; T=read();
    while(T--)Solve();
    return 0;
}
```

## E. Divide Square

大意：边长为 1000000 的矩形内有一些竖线或横线，所有线都会碰到矩形边界。问这些线把矩形分成几部分。

找了一下规律，发现答案为 `1+交点数+一下就可以把大矩形分成两块的线段数`。主要难点是统计交点数。

根据扫描线的操作，我们让一条水平的扫描线从下往上扫过整个大矩形。如果扫描线碰到竖线的下端点，我们让这个线段树的（竖线的横坐标）这个位置加 1，碰到上端点，那就这个位置减 1。如果扫描线碰到横线，那就统计线段树里的区间和。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf; const lf pi=acos(-1.0); lf readf(){lf x; if(scanf("%lf",&x)==-1)exit(0); return x;} typedef pair<ll,ll> pii; template<typename T> void operator<<(vector<T> &a,T b){a.push_back(b);}
const ll mod=(1?1000000007:998244353);
#define int ll
struct LR{
    int y,l,r;
}a[N];
struct event{
    int x,y,d;
};
struct seg{
    #define U(a,b) (a+b)
    ll a0=0;
    int n; ll a[1024*1024*2];
    void init(int inn){
        for(n=1;n<inn;n<<=1);
        repeat(i,0,n)a[n+i]=0;
        repeat_back(i,1,n)up(i);
    }
    void up(int x){
        a[x]=U(a[x<<1],a[(x<<1)^1]);
    }
    void update(int x,ll k){
        a[x+=n]+=k;
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
vector<event> e;
void Solve(){
    int n=read(),m=read(); tr.init(1000010);
    ll ans=1;
    repeat(i,0,n){
        a[i].y=read();
        a[i].l=read();
        a[i].r=read();
    }
    sort(a,a+n,[](LR a,LR b){return a.y<b.y;});
    repeat(i,0,m){
        int x=read(),u=read(),d=read();
        int t=(u==0)+(d==1000000);
        e<<(event){x,u,1}; //"<<" means push_back
        e<<(event){x,d+1,-1}; //"<<" means push_back
        ans+=(t==2);
    }
    sort(e.begin(),e.end(),[](event a,event b){return a.y>b.y;});
    repeat(i,0,n){
        int t=(a[i].l==0)+(a[i].r==1000000);
        while(!e.empty() && e.back().y<=a[i].y){
            tr.update(e.back().x,e.back().d);
            e.pop_back();
        }
        ans+=tr.query(a[i].l,a[i].r);
        ans+=(t==2);
    }
    cout<<ans<<endl;
}
signed main(){
    //freopen("data.txt","r",stdin);
    int T=1; //T=read();
    while(T--)Solve();
    return 0;
}
```

## F. Reverse and Swap

大意：维护一个数据结构，可以实现单点修改、区间求和、翻转、交换（具体看原题）。

因为翻转、交换操作满足交换率和结合律，因此这题就是一个魔改线段树。对于翻转操作来说，相当于在某一层的所有节点，交换左右儿子，然后懒标记下放，让儿子们也交换一下左右儿子。对于交换操作来说，相当于交换某一层的所有节点的左右儿子，不用下放懒标记。但是某一层的节点数是 `O(n)` 显然不行。因此对于这两种操作，需要一个特殊的懒标记，表示这个节点往下走多少层后，需要执行翻转/交换操作。

什么，你说你的线段树不能交换左右儿子？~~那就换成可持久化动态树套仙人掌吧~~。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=1000010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf; const lf pi=acos(-1.0); lf readf(){lf x; if(scanf("%lf",&x)==-1)exit(0); return x;} typedef pair<ll,ll> pii; template<typename T> void operator<<(vector<T> &a,T b){a.push_back(b);}
#define int ll
int in[N];
struct seg{
    #define U(x,y) (x+y)
    #define a0 0
    void toz(ll x1,ll x2){
        z1^=x1,z2^=x2;
    }
    ll a,z1,z2; seg *lc,*rc;
    void init(int,int);
    void up(){a=U(lc->a,rc->a);}
    void down(int l,int r){
        if(z1&1)swap(lc,rc),z1^=3;
        if(z2&1)swap(lc,rc);
        if(l<r){
            lc->toz(z1>>1,z2>>1);
            rc->toz(z1>>1,z2>>1);
        }
        z1=z2=0;
    }
    void update(int l,int r,ll k1,ll k2){
        z1^=k1;
        z2^=k2;
        down(l,r);
    }
    void change(int l,int r,ll x,ll y){
        if(l==x && r==x){
            down(l,r);
            a=y;
            return;
        }
        if(x<l || x>r){down(l,r); return;}
        int m=(l+r)/2; down(l,r);
        lc->change(l,m,x,y);
        rc->change(m+1,r,x,y);
        up();
    }
    ll query(int l,int r,int x,int y){
        x=max(x,l); y=min(y,r); if(x>y)return a0;
        down(l,r);
        if(x==l && y==r)return a;
        int m=(l+r)/2;
        return U(lc->query(l,m,x,y),rc->query(m+1,r,x,y));
    }
}tr[N*2],*pl;
void seg::init(int l,int r){
    if(l==r){a=in[l]; return;}
    int m=(l+r)/2;
    lc=++pl; lc->init(l,m);
    rc=++pl; rc->init(m+1,r);
    up();
}
void init(int l,int r){
    pl=tr; tr->init(l,r);
}
void Solve(){
    int nn=read(),q=read(); int n=1<<nn;
    repeat(i,0,n)in[i]=read();
    init(0,n-1);
    while(q--){
        int op=read();
        if(op==1){
            int x=read()-1,y=read();
            tr->change(0,n-1,x,y);
        }
        else if(op==2){
            int x=read(); x=nn-x;
            tr->update(0,n-1,1<<x,0);
        }
        else if(op==3){
            int x=read(); x=max(0ll,(nn-x)-1);
            tr->update(0,n-1,0,1<<x);
        }
        else{
            int x=read()-1,y=read()-1;
            cout<<tr->query(0,n-1,x,y)<<endl;
        }
    }
}
signed main(){
    //freopen("data.txt","r",stdin);
    int T=1; //T=read();
    while(T--)Solve();
    return 0;
}
```
