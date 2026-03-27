---
title: HDOJ 4352 数位dp 题解
date: 2020-03-15 00:54:00
permalink: /pages/b00617/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

数位 dp 好套路啊，感觉只要会这个套路已经做出题目大半了。

[题目链接](http://acm.hdu.edu.cn/showproblem.php?pid=4352)

题目前面全是废话，只要看题目描述的倒数第二行就行了。

大意是每次给定 $L,R,K$，求区间 $[L,R]$ 内满足要求的数的个数，要求是这个数字的十进制表示的最长上升子序列等于 K，（数据组数 $\le 10000,0<L\le R<2^{63}-1,1\le K\le 10$）。

比如 $1123$ 的 LIS 等于 $3$，$10123$ 的 LIS 等于 $4$。

首先讲一下数位 dp 的套路，就是记忆化搜索（因为很多题目都是多次给出 $L,R$，记忆化搜索方便很多），然后从最高位往低位搜索，搜索时要维护 $4$ 个量，一个是当前搜索到的位数 `pos`，一个是状态（状态可以用多个数表示），一个是 `lim`，表示是否被限制，最后一个是 `lz`，表示当前位的前一位是不是前导零（口胡的，听不懂大致看看代码就知道了）。

另外这题的状态用了一下状压，`a` 的第 `b1,b2,...,bk` 位是 `1` 代表当前最优秀的上升序列是 `[b1,b2,...,bk]`，`push` 函数返回把 `x` 加入 `a` 后的状态。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define mst(a,x) memset(a,x,sizeof(a))
typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
ll dp[20][1<<10][11],bit[20],k;
int push(int a,int x){
    if((a>>x)&1)return a;
    repeat(i,x+1,10)
    if((a>>i)&1){
        a^=(1<<i)^(1<<x);
        return a;
    }
    a^=(1<<x);
    return a;
}
ll dfs(int pos,int a,bool lim,bool lz){
    if(pos==-1)return __builtin_popcount(a)==k;
    ll &x=dp[pos][a][k];
    if(!lim && x!=-1)return x;
    ll ans=0;
    int maxi=lim?bit[pos]:9;
    repeat(i,0,maxi+1){
        int nexta=push(a,i); //状态转移
        if(i==0 && lz)nexta=a; //前导0就不要push了
        ans+=dfs(pos-1,nexta,
            lim && i==maxi,
            lz && i==0);
    }
    if(!lim)x=ans; //不限制的时候才做存储
    return ans;
}
ll solve(ll n){
    int len=0;
    while(n){
        bit[len++]=n%10;
        n/=10;
    }
    return dfs(len-1,0,1,1);
}
signed main(){
    ll t=read();
    mst(dp,-1);
    repeat(cases,1,t+1){
        ll l=read(),r=read(); k=read();
        printf("Case #%d: %lld\n",
            cases,solve(r)-solve(l-1));
    }
    return 0;
}
```
