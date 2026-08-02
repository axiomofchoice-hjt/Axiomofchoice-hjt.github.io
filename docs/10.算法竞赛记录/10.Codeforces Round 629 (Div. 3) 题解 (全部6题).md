---
title: Codeforces Round 629 (Div. 3) 题解 (全部6题)
date: 2020-03-27 08:56:00
permalink: /pages/52e899/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

[比赛链接](https://codeforces.com/contest/1328)

## A. Divisibility Problem

嘤。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=[]{ios::sync_with_stdio(0); cin.tie(0); return 0;}();
typedef long long ll;
const int N=200010;
//#define int ll
ll a,b,c,t;
signed main(){
    cin>>t;
    while(t--){
        cin>>a>>b;
        c=(b-a%b)%b;
        cout<<c<<endl;
    }
    return 0;
}
```

## B. K-th Beautiful String

嘤嘤。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=[]{ios::sync_with_stdio(0); cin.tie(0); return 0;}();
typedef long long ll;
const int N=200010;
//#define int ll
ll a,b,c,t,n;
string s;
signed main(){
    cin>>t;
    while(t--){
        cin>>n>>b;
        s.assign(n,'a');
        repeat(i,2,n+1){
            if(b<=i-1){
                s[n-i]='b';
                s[n-b]='b';
                cout<<s<<endl;
                break;
            }
            else b-=i-1;
        }
    }
    return 0;
}
```

## C. Ternary XOR

嘤嘤嘤。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=[]{ios::sync_with_stdio(0); cin.tie(0); return 0;}();
typedef long long ll;
const int N=200010;
//#define int ll
ll a,b,c,t,n;
string s,ans;
signed main(){
    cin>>t;
    while(t--){
        cin>>n;
        cin>>s;
        ans.assign(s.size(),'0');
        repeat(i,0,n){
            if(s[i]=='2')
                ans[i]='1';
            else if(s[i]=='0')
                ans[i]='0';
            else{
                ans[i]='1';
                break;
            }
        }
        cout<<ans<<endl;
        repeat(i,0,n)
            cout<<char((s[i]-ans[i]+3)%3+'0');
        cout<<endl;
    }
    return 0;
}
```

## D. Carousel

好了不嘤了。

题意是所有相邻的不同类必须不同色。如果把相邻的同类缩成一点（比如 `[1,1,2,2,2]` 缩成 `[1,2]`），这样可以通过缩完后序列长度奇偶性判断是否可行（全是一类的 1 种颜色，偶数就 2 种颜色，奇数就 3 种颜色）。

（当然我代码里没缩点，只是这么解释的。）

当然这么写会疯狂 wa2，因为如果 `[1,2,3,3]` 也是可以用两种颜色染色的（`[1,2,1,2]`），我们发现相邻的同一类也能染不同色的规则是有用的（！！）于是要特判一下。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=[]{ios::sync_with_stdio(0); cin.tie(0); return 0;}();
typedef long long ll;
const int N=200010;
//#define int ll
ll t,n;
int a[N];
void output(int c1,int c2,int c3){ //c1,c2,c3都是可用的颜色，c3还代表了颜色数
    int c=c3;
    cout<<c3<<endl;
    int now=a[0];
    repeat(i,0,n){
        if(now==a[i]);
        else if(c==c1)c=c2;
        else c=c1;
        cout<<c<<' ';
        now=a[i];
    }
    cout<<endl;
}
signed main(){
    cin>>t;
    while(t--){
        cin>>n;
        repeat(i,0,n)cin>>a[i];
        a[n]=a[0];
        int cnt=0;
        repeat(i,0,n){
            if(a[i]!=a[i+1])cnt++;
        }
        if(cnt==0)output(1,1,1);
        else if(cnt%2==0)output(1,2,2);
        else if(cnt==n)output(1,2,3);
        else{ //最后一种情况
            repeat(i,0,n){
                if(a[i]==a[i+1]){
                    a[i]=1e9; //染上一种独特的颜色
                    break;
                }
            }
            output(1,2,2);
        }
    }
    return 0;
}
```

## E. Tree Queries

前置芝士：最近公共祖先(lca)。

首先经过一系列复杂的计算我们发现，这条链完全可以是从 0 到 `v_t`（`dep[v_t]>=dep[v_i]` for `i=1..k`，说人话：给定点里最深的那个）。

既然链都确定了，就差判定了。我们求出 `v_i` 和 `v_t` 的最近公共祖先 `v_lca`，可知 `v_lca` 一定在链上，因此判断 `v_i` 与链的距离是否小于等于 1 就是看 `(v_i==v_lca)` 或者 `(v_i` 的父亲结点 `==v_lca)`。

这样时间复杂度能控制在 `O(n+(∑k) log n)`（如果和我一样用树剖的话）。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=[]{ios::sync_with_stdio(0); cin.tie(0); return 0;}();
typedef long long ll;
const int N=200010;
//#define int ll
int n,m;
vector<int> e[N];
int dep[N],son[N],sz[N],top[N],fa[N]; //son重儿子，top链顶

//lca板子开始

//这是树剖版的lca，主要是我只有两个lca板子其中一个还挂了qwq

void dfs1(int x){ //标注dep,sz,son,fa
    sz[x]=1;
    son[x]=-1;
    dep[x]=dep[fa[x]]+1;
    for(auto p:e[x]){
        if(p==fa[x])continue;
        fa[p]=x; dfs1(p);
        sz[x]+=sz[p];
        if(son[x]==-1 || sz[son[x]]<sz[p])
            son[x]=p;
    }
}
void dfs2(int x,int tv){ //标注top
    top[x]=tv;
    if(son[x]!=-1)dfs2(son[x],tv);
    for(auto p:e[x]){
        if(p==fa[x] || p==son[x])continue;
        dfs2(p,p);
    }
}
void init(int s){ //s是根
    fa[s]=s;
    dfs1(s);
    dfs2(s,s);
}
int lca(int x,int y){
    while(top[x]!=top[y])
        if(dep[top[x]]>=dep[top[y]])x=fa[top[x]];
        else y=fa[top[y]];
    return dep[x]<dep[y]?x:y;
}

//lca板子结束

int q[N];
signed main(){
    cin>>n>>m;
    repeat(i,0,n-1){
        int x,y; cin>>x>>y; x--,y--;
        e[x].push_back(y);
        e[y].push_back(x);
    }
    fa[0]=-1; init(0);
    while(m--){
        int s; cin>>s;
        int deepest=0;
        repeat(i,0,s){
            cin>>q[i],q[i]--;
            if(dep[deepest]<dep[q[i]])
                deepest=q[i];
        }
        bool f=1;
        repeat(i,0,s){
            int ancestor=lca(q[i],deepest);
            if(ancestor==q[i] || ancestor==fa[q[i]]);
            else f=0;
        }
        cout<<(f?"YES":"NO")<<endl;
    }
    return 0;
}
```

## F. Make k Equal

这是个毒瘤题，写了近一个小时，毒瘤。

毒瘤归毒瘤我 1a 还是挺高兴的。

分 3 种情况，所有数都压到中位数，从小压到大，从大压到小。

第一种情况就是……怎么说呢，反正中位数是最理想的。

后两种情况开个 map 维护一下比较方便（我觉得）。

辣鸡代码警告（别怪我没警告你 o）（最后一题我怎么只写了这么点题解呢）。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define fi first
#define se second
int cansel_sync=[]{ios::sync_with_stdio(0); cin.tie(0); return 0;}();
typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
const int N=200010;
#define int ll
int a[N];
map<int,int> m,m2;
signed main(){
    int n=read(),k=read();
    repeat(i,0,n)a[i]=read();
    sort(a,a+n);
    repeat(i,0,n){
        m[a[i]]++;
        if(!m.count(a[i]-1))m[a[i]-1]=0;
        if(!m.count(a[i]+1))m[a[i]+1]=0;
    }
    for(auto i:m)if(i.se>=k)cout<<0,exit(0);
    m2=m;
    
    int mid=a[(n-1)/2];
    ll nowl=0,nowr=0;
    repeat(i,0,n){
        if(a[i]<mid){
            nowl+=mid-a[i];
        }
        if(a[i]>mid){
            nowr+=a[i]-mid;
        }
    }
    
    ll now0=nowl+nowr-(n-k);
    
    ll now1=0;
    for(auto i=m.begin();i!=m.end();i++){
        if(i->se>=k)break;
        auto nxt=i; nxt++;
        if(nxt->se+i->se>=k){
            now1+=1ll*abs(nxt->fi-i->fi)*(k-nxt->se);
            break;
        }
        nxt->se+=i->se;
        now1+=1ll*abs(nxt->fi-i->fi)*(i->se);
    }
    
    m=m2;
    
    ll now2=0;
    for(auto i=m.rbegin();i!=m.rend();i++){
        if(i->se>=k)break;
        auto nxt=i; nxt++;
        if(nxt->se+i->se>=k){
            now2+=1ll*abs(nxt->fi-i->fi)*(k-nxt->se);
            break;
        }
        nxt->se+=i->se;
        now2+=1ll*abs(nxt->fi-i->fi)*(i->se);
    }
    cout<<min(now0,min(now1,now2));
    return 0;
}
```
