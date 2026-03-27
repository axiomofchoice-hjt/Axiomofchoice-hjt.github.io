---
title: AGC 044 A - Pay to Win 题解
date: 2020-05-24 06:30:00
permalink: /pages/478cd5/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[题面链接](https://atcoder.jp/contests/agc044/tasks/agc044_a)

题面翻译：给定 $N,A,B,C,D$，初始 $X=0$，对 $X$ 进行最少代价的操作让 $X=N$。

1. 花费 $A$ 个金币使 `X*=2`。
2. 花费 $B$ 个金币使 `X*=3`。
3. 花费 $C$ 个金币使 `X*=5`。
4. 花费 $D$ 个金币使 `X++` 或者 `X--`。

求最小代价（$N\le 10^{18},A,B,C,D\le 10^{9}$）。

虽然是简单题，但是毕竟是自己想出来的方法就写个题解吧 qwqqqq。

如果类似 dijkstra 直接暴搜的话，那么如果 $D=1,A,B,C,D=1e9$ 那就铁定 t 飞。

考虑让 $X$ 从 $N$ 变化到 $0$，然后让每一步操作至少包括一个除法，比如 $X=11$ 时，可以 `(x+1)/2` 或者 `(x-1)/2` 或者 `(x+1)/3` 或者 `(x-2)/3` 等等。

如果包括了一个除法，那么 $X$ 必然比之前的小（或者相等，相等的话不考虑就行了）。

当然最后一定是不断做 `X--` 操作变成 0 的，因此所有状态都算一遍 `cost+X*D` 更新答案。

附代码。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define fi first
#define se second
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
typedef long long ll;
#define int ll
map<int,int> mp; //mp[]表示转移到first的最小代价为second
int n,a,b,c,d;
void push(int n,int cost){
    if(mp.count(n))mp[n]=min(mp[n],cost);
    else mp[n]=cost;
}
void solve(){
    cin>>n>>a>>b>>c>>d;
    mp.clear();
    mp[n]=0;
    while(1){
        auto it=--mp.end();
        int n=it->fi,cost=it->se;
        if(n==0){cout<<cost<<endl; return;}
        if(n%2==0)push(n/2,cost+a);
            else push(n/2+1,cost+a+d),push(n/2,cost+a+d);
        push(n/3,cost+b+d*(n%3));
        push(n/3+1,cost+b+d*(3-n%3));
        push(n/5,cost+c+d*(n%5));
        push(n/5+1,cost+c+d*(5-n%5));
        if(n<int(1e18-cost)/d)
            push(0,cost+d*n);
        mp.erase(--mp.end());
    }
}
signed main(){
    int T; cin>>T;
    while(T--){
        solve();
    }
    return 0;
}
```
