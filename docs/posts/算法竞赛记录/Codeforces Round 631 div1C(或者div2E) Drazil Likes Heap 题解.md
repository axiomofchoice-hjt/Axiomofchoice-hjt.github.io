---
title: Codeforces Round 631 div1C(或者div2E) Drazil Likes Heap 题解
date: 2020-04-05 00:42:00
permalink: /pages/c3bba2/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[题目链接](https://codeforces.com/contest/1329/problem/C)

（~~我来装 b 了，给各位看看我的压行技术~~，雾）

贪心，如果根节点能删则删，否则把左右儿子当作根分别 dfs 一下（说明一下，如果删除了某个节点导致深度 g 以内出现了 0 就说明不能删，因为这样导致最终无法得到高为 g 的满二叉堆了）。

这里提供一下伪代码，可以和真·代码对照着看。

```cpp
void dfs(int x){
    if(a[x]==0)return;
    while( 可以删除a[x] ) 删除a[x], 记录x; //记录x因为最后要输出这个
    dfs(x*2); dfs(x*2+1);
}
```

至于为什么这个贪心是对的呢，感性理解一下就是，每次操作，如果删除大儿子节点的收益一定不如删除它的父亲，因此首先要不断删除根节点。如果发现某节点不能删除，其大儿子也必定不能删除，这样可以发现整条链（由大儿子大孙子组成）都无法被删除。这时候考虑这条链上某个节点的小儿子，它一旦被删除也只会变更小，无法翻身成为大儿子，这样保证了整条链的稳定性，所以不能删除的节点终究还是不能删除（怎么好像有点悲伤），因此确实不用考虑不能删除的节点了。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=2100010; typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
//#define int ll
int a[N],h,g;
#define lc (x*2) //左儿子编号
#define rc (x*2+1) //右儿子编号
#define bigch (a[lc]>a[rc]?lc:rc) //左右儿子中较大的儿子编号
int height(int x){ //x的高度，即删除x会让多少个数变化
    if(a[x]==0)return 0;
    return height(bigch)+1;
}
void del(int x){ //删除x，和题目里代码的功能一模一样
    if(a[x]==0)return;
    a[x]=a[bigch];
    del(bigch);
}
vector<int> ans;
void dfs(int x,int dep){ //递归求解，这个函数就是上文伪代码抽象出来的
    if(a[x]==0)return;
    while(height(x)+dep>g)del(x),ans.push_back(x);
    dfs(lc,dep+1); dfs(rc,dep+1);
}
signed main(){
    int T=read();
    while(T--){
        h=read(),g=read();
        fill(a,a+(1<<h)*2+2,0); ans.clear();
        repeat(i,1,(1<<h))a[i]=read();
        dfs(1,0);
        ll s=0; repeat(i,1,(1<<g))s+=a[i];
        cout<<s<<endl;
        for(auto i:ans)cout<<i<<' '; cout<<endl;
    }
    return 0;
}
```
